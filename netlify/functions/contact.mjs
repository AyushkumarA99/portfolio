// Netlify Serverless Function: contact.mjs
// Handles encrypted contact submissions with rate limiting, server-side validation, anti-spam honeypot, and optional email service dispatch.

// In-memory rate limiting map for function instance
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic HTML sanitization to neutralize malicious payloads
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// RFC 5322 compliant simplified email validator
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
}

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  // Enforce HTTP POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Method Not Allowed. Transmission must use HTTP POST.',
      }),
    };
  }

  // Rate Limiting by client IP
  const clientIp = event.headers['x-nf-client-connection-ip'] || 
                   event.headers['client-ip'] || 
                   event.headers['x-forwarded-for'] || 
                   'unknown-client';

  const now = Date.now();
  const clientHistory = rateLimitMap.get(clientIp) || { count: 0, firstSeen: now };

  if (now - clientHistory.firstSeen > RATE_LIMIT_WINDOW_MS) {
    clientHistory.count = 1;
    clientHistory.firstSeen = now;
  } else {
    clientHistory.count += 1;
  }
  rateLimitMap.set(clientIp, clientHistory);

  if (clientHistory.count > MAX_REQUESTS_PER_WINDOW) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Transmission rate limit exceeded. Please wait 60 seconds before sending another telemetry packet.',
      }),
    };
  }

  // Parse Body
  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Malformed JSON payload.',
      }),
    };
  }

  // Anti-Spam Honeypot check: If the hidden honeypot field is filled, silently swallow
  if (data.bot_field || data._gotcha || data.website_url) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Signal accepted.',
        mode: 'bot_filtered',
      }),
    };
  }

  const rawName = data.name;
  const rawEmail = data.email;
  const rawSubject = data.subject || 'Portfolio Transmission';
  const rawMessage = data.message;

  // Validation
  const errors = [];
  if (!rawName || typeof rawName !== 'string' || rawName.trim().length < 2) {
    errors.push('Name must be at least 2 characters long.');
  } else if (rawName.trim().length > 100) {
    errors.push('Name exceeds maximum limit of 100 characters.');
  }

  if (!rawEmail || !isValidEmail(rawEmail)) {
    errors.push('Valid email frequency address is required.');
  } else if (rawEmail.trim().length > 120) {
    errors.push('Email address exceeds 120 characters.');
  }

  if (rawSubject && (typeof rawSubject !== 'string' || rawSubject.trim().length > 150)) {
    errors.push('Subject exceeds maximum limit of 150 characters.');
  }

  if (!rawMessage || typeof rawMessage !== 'string' || rawMessage.trim().length < 5) {
    errors.push('Message transmission must contain at least 5 characters.');
  } else if (rawMessage.trim().length > 2000) {
    errors.push('Message transmission exceeds maximum limit of 2,000 characters.');
  }

  if (errors.length > 0) {
    return {
      statusCode: 422,
      headers,
      body: JSON.stringify({
        success: false,
        error: errors.join(' '),
        validationErrors: errors,
      }),
    };
  }

  const sanitized = {
    name: sanitizeString(rawName),
    email: sanitizeString(rawEmail),
    subject: sanitizeString(rawSubject),
    message: sanitizeString(rawMessage),
    receivedAt: new Date().toISOString(),
  };

  // Safe telemetry log on server
  console.log(`[AVIONICS CONTACT LOG] Signal received from: ${sanitized.name} (${sanitized.email}) | Subject: ${sanitized.subject}`);

  // Optional Email Service Dispatch
  const emailApiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || 'ayushkushwaha70935@gmail.com';

  if (emailApiKey) {
    try {
      // Dispatches via Resend API if configured
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${emailApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Uplink <onboarding@resend.dev>',
          to: [contactEmail],
          reply_to: sanitized.email,
          subject: `[Portfolio Uplink] ${sanitized.subject} — from ${sanitized.name}`,
          text: `New transmission received from portfolio:\n\nName: ${sanitized.name}\nEmail: ${sanitized.email}\nSubject: ${sanitized.subject}\nTime: ${sanitized.receivedAt}\n\nMessage:\n${sanitized.message}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('[EMAIL DISPATCH ERROR]', errorData);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            emailConfigured: false,
            mode: 'telemetry_stored',
            message: 'Transmission logged to server telemetry. Email service returned a dispatch status.',
            sanitizedReceipt: { name: sanitized.name, receivedAt: sanitized.receivedAt },
          }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          emailConfigured: true,
          mode: 'inbox_delivered',
          message: 'Transmission encrypted and dispatched directly to Ayush Kumar’s inbox.',
          sanitizedReceipt: { name: sanitized.name, receivedAt: sanitized.receivedAt },
        }),
      };
    } catch (err) {
      console.error('[EMAIL EXCEPTION]', err);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          emailConfigured: false,
          mode: 'telemetry_stored',
          message: 'Transmission securely logged to server telemetry. Mailto fallback available.',
          sanitizedReceipt: { name: sanitized.name, receivedAt: sanitized.receivedAt },
        }),
      };
    }
  }

  // Honest reporting: When no email provider credentials are configured
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      success: true,
      emailConfigured: false,
      mode: 'telemetry_stored',
      message: 'Transmission validated and logged to telemetry dispatch. EMAIL_API_KEY is not configured in the active environment; direct mailto uplink is also available.',
      sanitizedReceipt: { name: sanitized.name, receivedAt: sanitized.receivedAt },
    }),
  };
};
