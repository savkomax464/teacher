# AI Teacher Backend

Backend для Telegram Mini App "AI Teacher" на Cloudflare Workers с D1 базой данных и интеграцией Groq AI.

## Технологии

- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Framework**: Hono.js
- **AI**: Groq API (llama-3.1-8b-instant)

## Установка

```bash
npm install
```

## Настройка

### 1. Создать D1 базу данных

```bash
npm run db:create
```

Скопируйте `database_id` из вывода и вставьте в `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "ai-teacher-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 2. Применить миграции

Локально:
```bash
npm run db:migrate
```

В продакшене:
```bash
npm run db:migrate:prod
```

### 3. Добавить секреты

```bash
# Groq API Key
wrangler secret put GROQ_API_KEY
# Введите ваш Groq API ключ

# Telegram Bot Token
wrangler secret put TELEGRAM_BOT_TOKEN
# Введите ваш токен бота
```

## Разработка

Запустить локально:
```bash
npm run dev
```

API будет доступен на `http://localhost:8787`

## Деплой

```bash
npm run deploy
```

После деплоя вы получите URL вида: `https://ai-teacher-backend.YOUR_SUBDOMAIN.workers.dev`

## API Endpoints

### Учителя
- `GET /api/teachers` - получить всех учителей
- `POST /api/teachers` - создать учителя
- `DELETE /api/teachers/:id` - удалить учителя

### Прогресс
- `GET /api/progress` - получить весь прогресс
- `PUT /api/progress/:teacherId/:lessonId` - обновить прогресс
- `DELETE /api/progress` - очистить прогресс

### Чат
- `GET /api/chat/:teacherId/:lessonId` - получить историю (последние 20 сообщений)
- `POST /api/chat` - отправить сообщение и получить AI ответ

## Аутентификация

Все запросы должны содержать заголовок:
```
X-Telegram-Init-Data: <initData from Telegram WebApp>
```

## Структура проекта

```
backend/
├── src/
│   ├── index.ts              # Главный файл
│   ├── middleware/
│   │   └── auth.ts           # Telegram аутентификация
│   ├── routes/
│   │   ├── teachers.ts       # Роуты учителей
│   │   ├── progress.ts       # Роуты прогресса
│   │   └── chat.ts           # Роуты чата
│   └── services/
│       └── ai.ts             # Groq AI сервис
├── migrations/
│   └── 0001_initial_schema.sql
├── wrangler.toml
└── package.json
```

## Troubleshooting

### Ошибка "Unauthorized"
- Проверьте, что `TELEGRAM_BOT_TOKEN` правильно настроен
- Убедитесь, что фронтенд отправляет `X-Telegram-Init-Data` заголовок

### Ошибка "Failed to get AI response"
- Проверьте, что `GROQ_API_KEY` правильно настроен
- Проверьте лимиты API на Groq

### База данных не найдена
- Убедитесь, что `database_id` в `wrangler.toml` правильный
- Примените миграции: `npm run db:migrate:prod`
