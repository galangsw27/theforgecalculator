import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'api-proxy-middleware',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res, next) => {
            if (req.method !== 'POST') return next();

            try {
              const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Missing OPENROUTER_API_KEY in .env' }));
                return;
              }

              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const { messages } = JSON.parse(body);
                  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                      "Authorization": `Bearer ${apiKey}`,
                      "Content-Type": "application/json",
                      "HTTP-Referer": "http://localhost:3000",
                      "X-Title": "Fantasy Forge Calculator Local",
                    },
                    body: JSON.stringify({
                      "model": "google/gemini-2.5-flash",
                      "messages": messages,
                      "stream": true
                    })
                  });

                  if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    res.statusCode = response.status;
                    res.end(JSON.stringify(err));
                    return;
                  }

                  res.setHeader('Content-Type', 'text/event-stream');
                  res.setHeader('Cache-Control', 'no-cache');
                  res.setHeader('Connection', 'keep-alive');

                  const reader = response.body?.getReader();
                  if (!reader) throw new Error('No reader');

                  while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    res.write(value);
                  }
                  res.end();
                } catch (e: any) {
                  console.error('Proxy error:', e);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
            } catch (e) {
              next(e);
            }
          });

          server.middlewares.use('/api/embeddings', async (req, res, next) => {
            if (req.method !== 'POST') return next();

            try {
              const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Missing OPENROUTER_API_KEY in .env' }));
                return;
              }

              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const { text } = JSON.parse(body);
                  const response = await fetch('https://openrouter.ai/api/v1/embeddings', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                      'HTTP-Referer': 'http://localhost:3000',
                      'X-Title': 'Fantasy Forge Calculator Local',
                    },
                    body: JSON.stringify({
                      model: 'openai/text-embedding-ada-002',
                      input: text?.substring(0, 8000),
                    }),
                  });

                  const data = await response.json();
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                } catch (e: any) {
                  console.error('Proxy error:', e);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
            } catch (e) {
              next(e);
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
