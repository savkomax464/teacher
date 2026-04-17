-- Migration: Initial schema
-- Created: 2026-04-17
-- Description: Create tables for users, teachers, lesson progress, and chat messages

-- Таблица пользователей (Telegram ID)
CREATE TABLE users (
  telegram_id INTEGER PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at INTEGER NOT NULL
);

-- Таблица учителей
CREATE TABLE teachers (
  id TEXT PRIMARY KEY,
  telegram_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE
);

-- Индекс для быстрого поиска учителей пользователя
CREATE INDEX idx_teachers_telegram_id ON teachers(telegram_id);

-- Таблица прогресса уроков
CREATE TABLE lesson_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id INTEGER NOT NULL,
  teacher_id TEXT NOT NULL,
  lesson_id INTEGER NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL,
  UNIQUE(telegram_id, teacher_id, lesson_id),
  FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

-- Индекс для быстрого поиска прогресса пользователя
CREATE INDEX idx_lesson_progress_telegram_id ON lesson_progress(telegram_id);
CREATE INDEX idx_lesson_progress_teacher_id ON lesson_progress(teacher_id);

-- Таблица истории чата
CREATE TABLE chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  telegram_id INTEGER NOT NULL,
  teacher_id TEXT NOT NULL,
  lesson_id INTEGER NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (telegram_id) REFERENCES users(telegram_id) ON DELETE CASCADE,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

-- Индексы для быстрого поиска истории чата
CREATE INDEX idx_chat_messages_lookup ON chat_messages(telegram_id, teacher_id, lesson_id, timestamp DESC);
