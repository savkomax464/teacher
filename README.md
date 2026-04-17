# AI Teacher - Telegram Mini App

Образовательная платформа с AI учителями для Telegram.

## Структура проекта

- `frontend/` - React приложение (Vite + TypeScript)
- `backend/` - Cloudflare Workers API (Hono + D1)

## Быстрый старт

### Backend

```bash
cd backend
npm install
npm run db:create
# Обновите database_id в wrangler.toml
npm run db:migrate
wrangler secret put GROQ_API_KEY
wrangler secret put TELEGRAM_BOT_TOKEN
npm run deploy
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Обновите VITE_API_URL в .env
npm run build
```

## Деплой фронтенда

### Cloudflare Pages

1. Подключите репозиторий к Cloudflare Pages
2. Настройки сборки:
   - Build command: `cd frontend && npm install && npm run build`
   - Build output directory: `frontend/dist`
   - Environment variable: `VITE_API_URL=https://your-backend.workers.dev`

### Настройка Telegram Bot

1. Откройте @BotFather в Telegram
2. Используйте команду `/setmenubutton`
3. Выберите вашего бота
4. Введите URL: `https://your-frontend.pages.dev`
5. Введите название кнопки: "Open App"

## Технологии

**Frontend:**
- React 19
- TypeScript
- Framer Motion
- Vite

**Backend:**
- Cloudflare Workers
- Cloudflare D1 (SQLite)
- Hono.js
- Groq AI (llama-3.1-8b-instant)

## Функции

- ✅ Создание персонализированных AI учителей
- ✅ 20 уроков с детальным контентом
- ✅ Чат с AI учителем по каждому уроку
- ✅ Отслеживание прогресса обучения
- ✅ Интеграция с Telegram
- ✅ История чата (последние 20 сообщений)

## Лицензия

MIT
