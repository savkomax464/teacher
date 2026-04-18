import { getTelegramInitData, getTelegramUser } from '../utils/telegram';

const API_BASE_URL = 'https://ai-teacher-backend.savkomax8.workers.dev';

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const initData = getTelegramInitData();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Telegram-Init-Data': initData,
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// Teachers API
export interface Teacher {
  id: string;
  name: string;
  subject: string;
  description: string;
  created_at: number;
}

export async function getTeachers(): Promise<Teacher[]> {
  const response = await apiRequest<{ teachers: Teacher[] }>('/api/teachers');
  return response.teachers;
}

export async function createTeacher(
  name: string,
  subject: string,
  description: string
): Promise<Teacher> {
  const response = await apiRequest<{ teacher: Teacher }>('/api/teachers', {
    method: 'POST',
    body: JSON.stringify({ name, subject, description }),
  });
  return response.teacher;
}

export async function deleteTeacher(id: string): Promise<void> {
  await apiRequest(`/api/teachers/${id}`, {
    method: 'DELETE',
  });
}

// Progress API
export interface ProgressMap {
  [teacherId: string]: {
    [lessonId: number]: number;
  };
}

export async function getProgress(): Promise<ProgressMap> {
  const response = await apiRequest<{ progress: ProgressMap }>('/api/progress');
  return response.progress;
}

export async function updateProgress(
  teacherId: string,
  lessonId: number,
  progress: number
): Promise<void> {
  await apiRequest(`/api/progress/${teacherId}/${lessonId}`, {
    method: 'PUT',
    body: JSON.stringify({ progress }),
  });
}

export async function clearProgress(): Promise<void> {
  await apiRequest('/api/progress', {
    method: 'DELETE',
  });
}

// Chat API
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export async function getChatHistory(
  teacherId: string,
  lessonId: number
): Promise<ChatMessage[]> {
  const response = await apiRequest<{ messages: ChatMessage[] }>(
    `/api/chat/${teacherId}/${lessonId}`
  );
  return response.messages;
}

export async function sendChatMessage(
  teacherId: string,
  lessonId: number,
  message: string,
  lessonTitle: string,
  lessonEssence?: string
): Promise<{ userMessage: ChatMessage; aiMessage: ChatMessage }> {
  const response = await apiRequest<{
    userMessage: ChatMessage;
    aiMessage: ChatMessage;
  }>('/api/chat', {
    method: 'POST',
    body: JSON.stringify({
      teacherId,
      lessonId,
      message,
      lessonTitle,
      lessonEssence,
    }),
  });
  return response;
}

// Lessons API
export interface Lesson {
  id: number;
  teacher_id: string;
  lesson_number: number;
  title: string;
  description: string;
  essence: string;
  steps: LessonStep[];
  content: LessonContent | null;
  created_at: number;
}

export interface LessonStep {
  number: number;
  title: string;
  theory: string;
  practice: string;
}

export interface LessonContent {
  essence: string;
  rules: string;
  example: string;
  pitfalls: string[];
}

export async function generateLessons(teacherId: string): Promise<void> {
  await apiRequest(`/api/lessons/generate/${teacherId}`, {
    method: 'POST',
  });
}

export async function getLessons(teacherId: string): Promise<Lesson[]> {
  const response = await apiRequest<{ lessons: Lesson[] }>(`/api/lessons/${teacherId}`);
  return response.lessons;
}

export async function getLesson(teacherId: string, lessonNumber: number): Promise<Lesson> {
  const response = await apiRequest<{ lesson: Lesson }>(`/api/lessons/${teacherId}/${lessonNumber}`);
  return response.lesson;
}

export async function generateLessonDetails(teacherId: string, lessonNumber: number): Promise<Lesson> {
  const response = await apiRequest<{ lesson: Lesson }>(`/api/lessons/generate/${teacherId}/${lessonNumber}/details`, {
    method: 'POST',
  });
  return response.lesson;
}

// Mock mode for development without Telegram
export const isMockMode = !getTelegramUser();

if (isMockMode) {
  console.warn('Running in mock mode - Telegram WebApp not detected');
}
