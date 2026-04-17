import { Hono } from 'hono';
import { Context } from 'hono';
import { TelegramUser } from '../middleware/auth';

const teachers = new Hono();

// Получить всех учителей пользователя
teachers.get('/', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;

  const result = await db.prepare(`
    SELECT id, name, subject, description, created_at
    FROM teachers
    WHERE telegram_id = ?
    ORDER BY created_at DESC
  `).bind(user.id).all();

  return c.json({ teachers: result.results });
});

// Создать нового учителя
teachers.post('/', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;

  const body = await c.req.json();
  const { name, subject, description } = body;

  if (!name || !subject || !description) {
    return c.json({ error: 'Missing required fields' }, 400);
  }

  const id = `teacher_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const createdAt = Date.now();

  await db.prepare(`
    INSERT INTO teachers (id, telegram_id, name, subject, description, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(id, user.id, name, subject, description, createdAt).run();

  return c.json({
    teacher: {
      id,
      name,
      subject,
      description,
      created_at: createdAt
    }
  }, 201);
});

// Удалить учителя
teachers.delete('/:id', async (c: Context) => {
  const user = c.get('telegramUser') as TelegramUser;
  const db = c.env.DB;
  const teacherId = c.req.param('id');

  // Проверяем, что учитель принадлежит пользователю
  const teacher = await db.prepare(`
    SELECT id FROM teachers WHERE id = ? AND telegram_id = ?
  `).bind(teacherId, user.id).first();

  if (!teacher) {
    return c.json({ error: 'Teacher not found' }, 404);
  }

  // Удаляем учителя (каскадно удалятся прогресс и сообщения)
  await db.prepare(`
    DELETE FROM teachers WHERE id = ?
  `).bind(teacherId).run();

  return c.json({ success: true });
});

export default teachers;
