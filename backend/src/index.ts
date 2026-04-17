import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { telegramAuthMiddleware } from './middleware/auth';
import teachers from './routes/teachers';
import progress from './routes/progress';
import chat from './routes/chat';
import lessons from './routes/lessons';

export interface Env {
  GROQ_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// CORS middleware - разрешаем запросы с фронтенда
app.use('/*', cors({
  origin: '*', // В продакшене замените на конкретный домен
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-Telegram-Init-Data'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));

// Health check endpoint
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    service: 'AI Teacher Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API routes с аутентификацией
app.use('/api/*', telegramAuthMiddleware);

app.route('/api/teachers', teachers);
app.route('/api/progress', progress);
app.route('/api/chat', chat);
app.route('/api/lessons', lessons);

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({
    error: 'Internal server error',
    message: err.message
  }, 500);
});

export default app;
