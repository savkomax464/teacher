# 🎉 Финальная конфигурация

## URLs твоего приложения

**Backend:** https://ai-teacher-backend.savkomax8.workers.dev
**Frontend:** https://savkomax464.github.io/teacher/

## 🤖 Настройка Telegram бота

Открой **@BotFather** в Telegram и выполни:

```
/setmenubutton
```

1. Выбери своего бота
2. Введи текст кнопки: `Open App`
3. Введи URL: `https://savkomax464.github.io/teacher/`

## ⚙️ Обновление frontend для GitHub Pages

Нужно обновить `.env` файл с правильным API URL и пересобрать:

```bash
cd frontend
echo "VITE_API_URL=https://ai-teacher-backend.savkomax8.workers.dev" > .env
npm run build
```

Затем загрузи содержимое папки `frontend/dist` в твой GitHub репозиторий.

## 🧪 Проверка

1. Открой https://savkomax464.github.io/teacher/ в браузере
2. Открой консоль разработчика (F12)
3. Проверь, что нет ошибок CORS
4. Открой бота в Telegram и нажми "Open App"
5. Создай учителя и протестируй чат с AI

## 🔧 Если есть проблемы с CORS

Backend уже настроен на `origin: '*'`, но если будут проблемы, можно обновить в `backend/src/index.ts`:

```typescript
app.use('/*', cors({
  origin: 'https://savkomax464.github.io',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-Telegram-Init-Data'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}));
```

Затем передеплоить:
```bash
cd backend
npx wrangler deploy
```

## ✅ Готово!

После настройки бота в @BotFather, приложение будет работать по адресу:
`https://savkomax464.github.io/teacher/`
