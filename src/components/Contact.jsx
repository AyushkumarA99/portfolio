import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Terminal,
  Shield,
  ExternalLink,
  MessageSquare,
  User,
  AtSign,
  Tag,
} from 'lucide-react';
import { Github, Linkedin } from './Icons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    bot_field: '', // Anti-spam honeypot
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [feedback, setFeedback] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateFrontend = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Transmitter callsign (Name) is required.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Return frequency (Email) is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Packet subject is required.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Encrypted message content is required.';
    } else if (formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific validation error on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const errors = validateFrontend();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setStatus('loading');
    setFeedback(null);

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setStatus('error');
        setFeedback({
          type: 'error',
          message: result.error || 'Server rejected transmission packet. Please check inputs or use mailto link.',
        });
        // Preserves formData intact upon failure so user never loses their typed text!
        return;
      }

      // Success
      setStatus('success');
      setFeedback({
        type: 'success',
        emailConfigured: result.emailConfigured,
        mode: result.mode,
        message: result.message,
        receipt: result.sanitizedReceipt,
      });

      // Clear form on confirmed success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        bot_field: '',
      });
    } catch (err) {
      setStatus('error');
      setFeedback({
        type: 'error',
        message:
          'Network anomaly encountered while reaching /.netlify/functions/contact. Please verify your connection or use the direct mailto uplink below.',
      });
    }
  };

  // Precomputed mailto URL for fallback
  const mailtoUrl = `mailto:ayushkushwaha70935@gmail.com?subject=${encodeURIComponent(
    formData.subject || 'Portfolio Uplink Transmission'
  )}&body=${encodeURIComponent(
    `From: ${formData.name || 'Anonymous'}\nEmail: ${formData.email || 'None'}\n\nMessage:\n${formData.message || ''}`
  )}`;

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
      aria-label="Contact Section"
    >
      {/* Module Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-2 border-b border-primary/20">
        <div className="flex items-center gap-2">
          <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-widest">
            [ SYS_MODULE: 07_ENCRYPTED_UPLINK ]
          </span>
        </div>
        <span className="font-label-telemetry text-[10px] text-amber-bright bg-amber-warn/10 border border-amber-warn/30 px-2 py-0.5 rounded">
          BEACON BROADCAST // ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Transmission Brief & Verified External Channels */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-white">
              Initiate Uplink Transmission
            </h2>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Have an opportunity, technical query, collaboration idea, or project proposition? Transmit an encrypted packet or establish direct contact through verified communications channels.
            </p>
          </div>

          {/* Direct Uplink Channels */}
          <div className="flex flex-col gap-2.5">
            <span className="font-label-telemetry text-xs text-primary uppercase font-bold tracking-wider">
              VERIFIED CHANNELS:
            </span>

            {/* Direct Email Card */}
            <a
              href="mailto:ayushkushwaha70935@gmail.com"
              className="p-3.5 rounded-lg bg-obsidian-card/85 border border-outline-variant hover:border-primary/50 flex items-center justify-between text-on-surface hover:text-primary transition-all group"
              title="Send Direct Email to Ayush Kumar"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded bg-obsidian-panel border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-label-telemetry text-[10px] text-on-surface-variant">DIRECT EMAIL</span>
                  <span className="font-label-code text-xs text-white group-hover:text-primary truncate">
                    ayushkushwaha70935@gmail.com
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary shrink-0" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/AyushkumarA99"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg bg-obsidian-card/85 border border-outline-variant hover:border-primary/50 flex items-center justify-between text-on-surface hover:text-primary transition-all group"
              title="Open GitHub Profile: https://github.com/AyushkumarA99"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded bg-obsidian-panel border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary">
                  <Github className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-label-telemetry text-[10px] text-on-surface-variant">CODE REPOSITORIES</span>
                  <span className="font-label-code text-xs text-white group-hover:text-primary truncate">
                    github.com/AyushkumarA99
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary shrink-0" />
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/ayush-kumar-b7358630a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-lg bg-obsidian-card/85 border border-outline-variant hover:border-secondary/50 flex items-center justify-between text-on-surface hover:text-secondary transition-all group"
              title="Open LinkedIn: Ayush Kumar"
            >
              <div className="flex items-center gap-3 truncate">
                <div className="w-9 h-9 rounded bg-obsidian-panel border border-secondary/30 flex items-center justify-center text-secondary group-hover:border-secondary">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-label-telemetry text-[10px] text-on-surface-variant">PROFESSIONAL NETWORK</span>
                  <span className="font-label-code text-xs text-white group-hover:text-secondary truncate">
                    linkedin.com/in/ayush-kumar-b7358630a
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-secondary shrink-0" />
            </a>
          </div>

          {/* Quick Mailto Fallback Action */}
          <div className="p-3.5 rounded-lg bg-obsidian-panel border border-outline-variant flex flex-col gap-2">
            <span className="font-label-telemetry text-[10px] text-amber-bright uppercase font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-bright" />
              <span>Direct Client-Side Uplink</span>
            </span>
            <p className="font-sans text-xs text-on-surface-variant">
              Prefer launching your default local email application immediately?
            </p>
            <a
              href="mailto:ayushkushwaha70935@gmail.com"
              className="clip-tag inline-flex items-center justify-center gap-2 py-2 px-3 bg-obsidian-card border border-primary/40 text-primary hover:border-primary text-xs font-mono font-semibold transition-all text-center"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>Open Mail App (ayushkushwaha70935@gmail.com)</span>
            </a>
          </div>
        </div>

        {/* Right Column: Encrypted Contact Form with Serverless Endpoint */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative rounded-xl bg-obsidian-card/90 border border-primary/40 p-6 sm:p-8 hud-bracket shadow-2xl backdrop-blur-md flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-telemetry text-xs text-primary font-bold uppercase">
                  SERVERLESS UPLINK TRANSMITTER
                </span>
              </div>
              <span className="font-label-telemetry text-[10px] text-on-surface-variant font-mono">
                ENDPOINT: /.netlify/functions/contact
              </span>
            </div>

            {/* Submission Feedback Notice Banner */}
            {feedback && (
              <div
                className={`p-4 rounded-lg border flex flex-col gap-2 font-sans text-xs leading-relaxed transition-all ${
                  feedback.type === 'success'
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                }`}
                role="alert"
                aria-live="polite"
              >
                <div className="flex items-start gap-2.5">
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex flex-col gap-1">
                    <span className="font-grotesk font-bold text-sm">
                      {feedback.type === 'success'
                        ? 'TRANSMISSION CONFIRMED // PACKET ACCEPTED'
                        : 'TRANSMISSION FAILED // ANOMALY DETECTED'}
                    </span>
                    <p>{feedback.message}</p>

                    {/* Honest Email Status Disclosure */}
                    {feedback.type === 'success' && !feedback.emailConfigured && (
                      <div className="mt-2 p-2.5 rounded bg-obsidian/70 border border-amber-warn/40 text-amber-bright text-[11px] font-mono flex flex-col gap-1">
                        <span className="font-bold">// ENVIRONMENT TELEMETRY NOTICE:</span>
                        <span>
                          Server logged this telemetry payload safely. Since no <code>EMAIL_API_KEY</code> is configured on the host, automated SMTP/API email forwarding is in standby.
                        </span>
                        <a
                          href={mailtoUrl}
                          className="text-primary underline hover:text-white mt-1 flex items-center gap-1 font-semibold"
                        >
                          Click here to open a prefilled mailto email in your default mail app &rarr;
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {/* Anti-spam Honeypot (Hidden from humans) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="bot_field">Do not fill this field if human</label>
                <input
                  id="bot_field"
                  name="bot_field"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.bot_field}
                  onChange={handleChange}
                />
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Transmitter Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="font-label-telemetry text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary" />
                    <span>Transmitter Name *</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    disabled={status === 'loading'}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian-lowest border text-white font-sans text-sm placeholder:text-on-surface-variant/40 focus:outline-none transition-all ${
                      validationErrors.name
                        ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {validationErrors.name && (
                    <span className="font-sans text-[11px] text-red-400" role="alert">
                      {validationErrors.name}
                    </span>
                  )}
                </div>

                {/* Return Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="font-label-telemetry text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                    <AtSign className="w-3.5 h-3.5 text-primary" />
                    <span>Return Frequency (Email) *</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@domain.com"
                    disabled={status === 'loading'}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian-lowest border text-white font-sans text-sm placeholder:text-on-surface-variant/40 focus:outline-none transition-all ${
                      validationErrors.email
                        ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
                    }`}
                  />
                  {validationErrors.email && (
                    <span className="font-sans text-[11px] text-red-400" role="alert">
                      {validationErrors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-subject" className="font-label-telemetry text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>Subject Directive *</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineering Opportunity / Project Discussion"
                  disabled={status === 'loading'}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian-lowest border text-white font-sans text-sm placeholder:text-on-surface-variant/40 focus:outline-none transition-all ${
                    validationErrors.subject
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                />
                {validationErrors.subject && (
                  <span className="font-sans text-[11px] text-red-400" role="alert">
                    {validationErrors.subject}
                  </span>
                )}
              </div>

              {/* Message Payload */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="contact-message" className="font-label-telemetry text-xs text-primary font-bold uppercase flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span>Encrypted Message Packet *</span>
                  </label>
                  <span className="font-label-telemetry text-[10px] text-on-surface-variant">
                    {formData.message.length} / 2000 CHARS
                  </span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Transmit your message details here..."
                  disabled={status === 'loading'}
                  className={`w-full px-3.5 py-2.5 rounded-lg bg-obsidian-lowest border text-white font-sans text-sm placeholder:text-on-surface-variant/40 focus:outline-none transition-all resize-y min-h-[110px] ${
                    validationErrors.message
                      ? 'border-red-500 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                      : 'border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
                />
                {validationErrors.message && (
                  <span className="font-sans text-[11px] text-red-400" role="alert">
                    {validationErrors.message}
                  </span>
                )}
              </div>

              {/* Action Trigger Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="clip-chamfer w-full py-3.5 px-6 bg-gradient-to-r from-primary via-primary-fixed-dim to-primary text-obsidian font-label-code text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(0,240,255,0.35)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] disabled:opacity-60 disabled:cursor-not-allowed active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 text-obsidian animate-spin" />
                    <span>ENCRYPTING &amp; TRANSMITTING PACKET...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-obsidian" />
                    <span>TRANSMIT SIGNAL</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
