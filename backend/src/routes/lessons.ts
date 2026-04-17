import { Hono } from 'hono';
import { generateLessonPlan, generateLessonSteps, generateLessonContent } from '../services/lessonGenerator';

const lessons = new Hono();

// Генерация уроков для учителя
lessons.post('/generate/:teacherId', async (c) => {
  const teacherId = c.req.param('teacherId');
  const db = c.env.DB;

  try {
    // Получаем данные учителя
    const teacher = await db.prepare(
      'SELECT * FROM teachers WHERE id = ?'
    ).bind(teacherId).first();

    if (!teacher) {
      return c.json({ error: 'Teacher not found' }, 404);
    }

    // Генерируем план из 20 уроков
    const lessonPlan = await generateLessonPlan(
      c.env.GROQ_API_KEY,
      teacher.subject as string,
      teacher.description as string
    );

    // Сохраняем уроки в БД (пока без детального контента)
    const now = Date.now();
    for (const lesson of lessonPlan) {
      await db.prepare(`
        INSERT INTO lessons (teacher_id, lesson_number, title, description, essence, steps, content, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(teacher_id, lesson_number) DO UPDATE SET
          title = excluded.title,
          description = excluded.description
      `).bind(
        teacherId,
        lesson.number,
        lesson.title,
        lesson.description,
        '', // essence - будет заполнено позже
        '[]', // steps - будет заполнено позже
        '', // content - будет заполнено позже
        now
      ).run();
    }

    return c.json({
      success: true,
      lessons: lessonPlan,
      message: 'Lessons generated successfully'
    });
  } catch (error) {
    console.error('Failed to generate lessons:', error);
    return c.json({ error: 'Failed to generate lessons' }, 500);
  }
});

// Генерация детального контента для урока
lessons.post('/generate/:teacherId/:lessonNumber/details', async (c) => {
  const teacherId = c.req.param('teacherId');
  const lessonNumber = parseInt(c.req.param('lessonNumber'));
  const db = c.env.DB;

  try {
    // Получаем урок
    const lesson = await db.prepare(
      'SELECT * FROM lessons WHERE teacher_id = ? AND lesson_number = ?'
    ).bind(teacherId, lessonNumber).first();

    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    // Генерируем 10 шагов
    const steps = await generateLessonSteps(
      c.env.GROQ_API_KEY,
      lesson.title as string,
      lesson.description as string
    );

    // Генерируем детальный контент на основе первого шага
    const firstStep = steps[0];
    const content = await generateLessonContent(
      c.env.GROQ_API_KEY,
      firstStep.title,
      firstStep.theory,
      firstStep.practice
    );

    // Обновляем урок в БД
    await db.prepare(`
      UPDATE lessons
      SET essence = ?, steps = ?, content = ?
      WHERE teacher_id = ? AND lesson_number = ?
    `).bind(
      content.essence,
      JSON.stringify(steps),
      JSON.stringify(content),
      teacherId,
      lessonNumber
    ).run();

    return c.json({
      success: true,
      lesson: {
        ...lesson,
        essence: content.essence,
        steps,
        content
      }
    });
  } catch (error) {
    console.error('Failed to generate lesson details:', error);
    return c.json({ error: 'Failed to generate lesson details' }, 500);
  }
});

// Получить все уроки учителя
lessons.get('/:teacherId', async (c) => {
  const teacherId = c.req.param('teacherId');
  const db = c.env.DB;

  try {
    const result = await db.prepare(
      'SELECT * FROM lessons WHERE teacher_id = ? ORDER BY lesson_number ASC'
    ).bind(teacherId).all();

    const lessons = result.results.map((lesson: any) => ({
      ...lesson,
      steps: lesson.steps ? JSON.parse(lesson.steps) : [],
      content: lesson.content ? JSON.parse(lesson.content) : null,
    }));

    return c.json({ lessons });
  } catch (error) {
    console.error('Failed to get lessons:', error);
    return c.json({ error: 'Failed to get lessons' }, 500);
  }
});

// Получить конкретный урок
lessons.get('/:teacherId/:lessonNumber', async (c) => {
  const teacherId = c.req.param('teacherId');
  const lessonNumber = parseInt(c.req.param('lessonNumber'));
  const db = c.env.DB;

  try {
    const lesson = await db.prepare(
      'SELECT * FROM lessons WHERE teacher_id = ? AND lesson_number = ?'
    ).bind(teacherId, lessonNumber).first();

    if (!lesson) {
      return c.json({ error: 'Lesson not found' }, 404);
    }

    return c.json({
      lesson: {
        ...lesson,
        steps: lesson.steps ? JSON.parse(lesson.steps as string) : [],
        content: lesson.content ? JSON.parse(lesson.content as string) : null,
      }
    });
  } catch (error) {
    console.error('Failed to get lesson:', error);
    return c.json({ error: 'Failed to get lesson' }, 500);
  }
});

export default lessons;
