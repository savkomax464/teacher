import { Hono } from 'hono';
import { Context } from 'hono';
import { TelegramUser } from '../middleware/auth';

const progress = new Hono();

// Получить весь прогресс пользователя
progress.get('/', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;

  const result = await db.prepare(`
    SELECT teacher_id, lesson_id, progress
    FROM lesson_progress
    WHERE telegram_id = ?
  `).bind(user.id).all();

  // Преобразуем в удобный формат
  const progressMap: Record<string, Record<number, number>> = {};
  for (const row of result.results as any[]) {
    if (!progressMap[row.teacher_id]) {
      progressMap[row.teacher_id] = {};
    }
    progressMap[row.teacher_id][row.lesson_id] = row.progress;
  }

  return c.json({ progress: progressMap });
});

// Обновить прогресс урока
progress.put('/:teacherId/:lessonId', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;
  const teacherId = c.req.param('teacherId');
  const lessonId = parseInt(c.req.param('lessonId'));

  const body = await c.req.json();
  const { progress: progressValue } = body;

  if (typeof progressValue !== 'number' || progressValue < 0 || progressValue > 100) {
    return c.json({ error: 'Invalid progress value' }, 400);
  }

  const updatedAt = Date.now();

  await db.prepare(`
    INSERT INTO lesson_progress (telegram_id, teacher_id, lesson_id, progress, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(telegram_id, teacher_id, lesson_id) DO UPDATE SET
      progress = MAX(progress, excluded.progress),
      updated_at = excluded.updated_at
  `).bind(user.id, teacherId, lessonId, progressValue, updatedAt).run();

  return c.json({ success: true, progress: progressValue });
});

// Очистить весь прогресс
progress.delete('/', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;

  await db.prepare(`
    DELETE FROM lesson_progress WHERE telegram_id = ?
  `).bind(user.id).run();

  return c.json({ success: true });
});

export default progress;
