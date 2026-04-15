const STORAGE_KEY = 'ai-teacher-lesson-progress';

export function loadProgress(): Record<number, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<number, number>;
  } catch {
    return {};
  }
}

export function saveProgress(progress: Record<number, number>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function getLessonProgress(lessonId: number): number {
  const progress = loadProgress();
  return progress[lessonId] ?? 0;
}

export function setLessonProgress(lessonId: number, value: number): void {
  const progress = loadProgress();
  // Только увеличиваем прогресс, никогда не уменьшаем
  const current = progress[lessonId] ?? 0;
  progress[lessonId] = Math.min(100, Math.max(current, Math.round(value)));
  saveProgress(progress);
}

export function markLessonComplete(lessonId: number): void {
  setLessonProgress(lessonId, 100);
}

export function getAllProgress(): Record<number, number> {
  return loadProgress();
}

export function clearAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
