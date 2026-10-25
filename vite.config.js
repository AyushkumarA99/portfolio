import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function netlifyFunctionsDev() {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (url.startsWith('/.netlify/functions/contact') || url.startsWith('/api/contact')) {
          const { handler } = await import('./netlify/functions/contact.mjs');
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const event = {
                httpMethod: req.method,
                headers: req.headers,
                body,
              };
              const result = await handler(event, {});
              res.statusCode = result.statusCode || 200;
              if (result.headers) {
                Object.entries(result.headers).forEach(([k, v]) => res.setHeader(k, v));
              }
              res.end(result.body);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: 'Internal server error in dev runner' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [react(), netlifyFunctionsDev()],
  server: {
    port: 5173,
    host: true,
  },
});
