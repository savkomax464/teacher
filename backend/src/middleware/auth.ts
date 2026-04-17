import { Context } from 'hono';
import { createHmac } from 'node:crypto';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

export async function validateTelegramAuth(c: Context, botToken: string): Promise<TelegramUser | null> {
  const initData = c.req.header('X-Telegram-Init-Data');

  if (!initData) {
    return null;
  }

  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');

    if (!hash) {
      return null;
    }

    urlParams.delete('hash');

    // Создаем строку для проверки
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    // Вычисляем секретный ключ
    const secretKey = createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    // Вычисляем хеш
    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    // Проверяем хеш
    if (calculatedHash !== hash) {
      return null;
    }

    // Извлекаем данные пользователя
    const userParam = urlParams.get('user');
    if (!userParam) {
      return null;
    }

    const user = JSON.parse(userParam) as TelegramUser;
    return user;
  } catch (error) {
    console.error('Telegram auth validation error:', error);
    return null;
  }
}

export async function telegramAuthMiddleware(c: Context, next: () => Promise<void>) {
  const botToken = c.env.TELEGRAM_BOT_TOKEN;
  const user = await validateTelegramAuth(c, botToken);

  if (!user) {
    // В режиме разработки создаем тестового пользователя
    const isDev = c.env.ENVIRONMENT === 'development';
    if (isDev) {
      const testUser: TelegramUser = {
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser'
      };
      c.set('telegramUser', testUser);

      // Создаем тестового пользователя в БД
      const db = c.env.DB;
      await db.prepare(`
        INSERT INTO users (telegram_id, username, first_name, last_name, created_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(telegram_id) DO UPDATE SET
          username = excluded.username,
          first_name = excluded.first_name,
          last_name = excluded.last_name
      `).bind(
        testUser.id,
        testUser.username || null,
        testUser.first_name,
        testUser.last_name || null,
        Date.now()
      ).run();

      await next();
      return;
    }

    return c.json({ error: 'Unauthorized' }, 401);
  }

  // Сохраняем пользователя в контексте
  c.set('telegramUser', user);

  // Создаем или обновляем пользователя в БД
  const db = c.env.DB;
  await db.prepare(`
    INSERT INTO users (telegram_id, username, first_name, last_name, created_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(telegram_id) DO UPDATE SET
      username = excluded.username,
      first_name = excluded.first_name,
      last_name = excluded.last_name
  `).bind(
    user.id,
    user.username || null,
    user.first_name,
    user.last_name || null,
    Date.now()
  ).run();

  await next();
}
