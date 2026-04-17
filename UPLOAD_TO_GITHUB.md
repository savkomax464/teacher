# 📦 Загрузка на GitHub Pages

## Файлы для загрузки

Содержимое папки `frontend/dist/` нужно загрузить в корень твоего GitHub репозитория `savkomax464/teacher`.

## Вариант 1: Через командную строку (если репозиторий уже склонирован)

```bash
# Перейди в папку с репозиторием GitHub
cd /path/to/your/teacher-repo

# Скопируй файлы из dist
cp -r /Users/maksim/Desktop/vs\ code/teacher/frontend/dist/* .

# Добавь изменения
git add .

# Создай коммит
git commit -m "Update frontend with backend integration"

# Загрузи на GitHub
git push origin main
```

## Вариант 2: Вручную через GitHub

1. Открой https://github.com/savkomax464/teacher
2. Загрузи следующие файлы из `frontend/dist/`:
   - `index.html`
   - `favicon.svg`
   - Папку `assets/` (со всем содержимым)

## Вариант 3: Автоматический деплой (рекомендуется)

Создай файл `.github/workflows/deploy.yml` в корне репозитория:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd frontend
          npm install --legacy-peer-deps
      
      - name: Build
        run: |
          cd frontend
          echo "VITE_API_URL=https://ai-teacher-backend.savkomax8.workers.dev" > .env
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./frontend/dist
```

После этого каждый push в main будет автоматически деплоить фронтенд!

## ✅ После загрузки

1. Подожди 1-2 минуты пока GitHub Pages обновится
2. Открой https://savkomax464.github.io/teacher/
3. Проверь, что приложение загружается
4. Открой консоль (F12) и проверь, что нет ошибок

## 🤖 Настройка Telegram бота

После успешной загрузки, открой @BotFather и выполни:

```
/setmenubutton
```

1. Выбери своего бота
2. Введи текст: `Open App`
3. Введи URL: `https://savkomax464.github.io/teacher/`

## 🎉 Готово!

Твое приложение будет доступно по адресу:
**https://savkomax464.github.io/teacher/**

И будет работать с backend:
**https://ai-teacher-backend.savkomax8.workers.dev**
