-- Migration: Add lessons table
-- Created: 2026-04-17

CREATE TABLE IF NOT EXISTS lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  essence TEXT NOT NULL,
  steps TEXT NOT NULL, -- JSON array of 10 steps
  content TEXT NOT NULL, -- Detailed content
  created_at INTEGER NOT NULL,
  UNIQUE(teacher_id, lesson_number),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);

CREATE INDEX idx_lessons_teacher ON lessons(teacher_id);
