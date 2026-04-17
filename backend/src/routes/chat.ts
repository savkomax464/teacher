import { Hono } from 'hono';
import { Context } from 'hono';
import { TelegramUser } from '../middleware/auth';
import { AIService } from '../services/ai';

const chat = new Hono();

// Получить историю чата (последние 20 сообщений)
chat.get('/:teacherId/:lessonId', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;
  const teacherId = c.req.param('teacherId');
  const lessonId = parseInt(c.req.param('lessonId'));

  const result = await db.prepare(`
    SELECT role, content, timestamp
    FROM chat_messages
    WHERE telegram_id = ? AND teacher_id = ? AND lesson_id = ?
    ORDER BY timestamp DESC
    LIMIT 20
  `).bind(user.id, teacherId, lessonId).all();

  // Переворачиваем, чтобы старые сообщения были первыми
  const messages = (result.results as any[]).reverse();

  return c.json({ messages });
});

// Отправить сообщение и получить ответ от AI
chat.post('/', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;

  const body = await c.req.json();
  const { teacherId, lessonId, message, lessonTitle, lessonEssence } = body;

  if (!teacherId || !lessonId || !message || !lessonTitle) {
    return c.json({ error: 'Missing required fields' }, 400);
  }

  // Получаем информацию об учителе
  const teacher = await db.prepare(`
    SELECT name, subject, description
    FROM teachers
    WHERE id = ? AND telegram_id = ?
  `).bind(teacherId, user.id).first();

  if (!teacher) {
    return c.json({ error: 'Teacher not found' }, 404);
  }

  // Получаем историю чата
  const historyResult = await db.prepare(`
    SELECT role, content
    FROM chat_messages
    WHERE telegram_id = ? AND teacher_id = ? AND lesson_id = ?
    ORDER BY timestamp DESC
    LIMIT 20
  `).bind(user.id, teacherId, lessonId).all();

  const chatHistory = (historyResult.results as any[]).reverse();

  // Сохраняем сообщение пользователя
  const userTimestamp = Date.now();
  await db.prepare(`
    INSERT INTO chat_messages (telegram_id, teacher_id, lesson_id, role, content, timestamp)
    VALUES (?, ?, ?, 'user', ?, ?)
  `).bind(user.id, teacherId, lessonId, message, userTimestamp).run();

  // Получаем ответ от AI
  const aiService = new AIService(c.env.GROQ_API_KEY);

  try {
    const aiResponse = await aiService.getChatResponse(
      teacher.name as string,
      teacher.subject as string,
      teacher.description as string,
      lessonTitle,
      lessonEssence || '',
      message,
      chatHistory
    );

    // Сохраняем ответ AI
    const aiTimestamp = Date.now();
    await db.prepare(`
      INSERT INTO chat_messages (telegram_id, teacher_id, lesson_id, role, content, timestamp)
      VALUES (?, ?, ?, 'assistant', ?, ?)
    `).bind(user.id, teacherId, lessonId, aiResponse, aiTimestamp).run();

    // Удаляем старые сообщения, оставляя только последние 20
    await db.prepare(`
      DELETE FROM chat_messages
      WHERE id NOT IN (
        SELECT id FROM chat_messages
        WHERE telegram_id = ? AND teacher_id = ? AND lesson_id = ?
        ORDER BY timestamp DESC
        LIMIT 20
      ) AND telegram_id = ? AND teacher_id = ? AND lesson_id = ?
    `).bind(user.id, teacherId, lessonId, user.id, teacherId, lessonId).run();

    return c.json({
      userMessage: {
        role: 'user',
        content: message,
        timestamp: userTimestamp
      },
      aiMessage: {
        role: 'assistant',
        content: aiResponse,
        timestamp: aiTimestamp
      }
    });
  } catch (error) {
    console.error('AI service error:', error);
    return c.json({ error: 'Failed to get AI response' }, 500);
  }
});

export default chat;
