export interface Lesson {
  id: number;
  title: string;
  description: string;
  progress: number; // 0-100
}

export const lessons: Lesson[] = [
  { id: 1, title: 'Introduction to Basics', description: 'Learn the fundamental concepts and terminology', progress: 0 },
  { id: 2, title: 'Building Blocks', description: 'Understand core principles and structures', progress: 0 },
  { id: 3, title: 'First Steps', description: 'Practice basic exercises to build confidence', progress: 0 },
  { id: 4, title: 'Deep Dive', description: 'Explore intermediate topics in detail', progress: 0 },
  { id: 5, title: 'Challenge Zone', description: 'Test your knowledge with harder problems', progress: 0 },
  { id: 6, title: 'Pattern Recognition', description: 'Identify common patterns and structures', progress: 0 },
  { id: 7, title: 'Problem Solving', description: 'Apply learned concepts to real scenarios', progress: 0 },
  { id: 8, title: 'Logic Puzzles', description: 'Develop critical thinking skills', progress: 0 },
  { id: 9, title: 'Creative Thinking', description: 'Think outside the box with open-ended tasks', progress: 0 },
  { id: 10, title: 'Advanced Techniques', description: 'Master new and complex skills', progress: 0 },
  { id: 11, title: 'Strategy Guide', description: 'Plan your approach to complex topics', progress: 0 },
  { id: 12, title: 'Expert Tips', description: 'Learn advanced strategies from experts', progress: 0 },
  { id: 13, title: 'Real World Applications', description: 'See how concepts work in practice', progress: 0 },
  { id: 14, title: 'Case Studies', description: 'Analyze real examples and scenarios', progress: 0 },
  { id: 15, title: 'Best Practices', description: 'Follow industry standards and conventions', progress: 0 },
  { id: 16, title: 'Common Pitfalls', description: 'Avoid frequent mistakes and errors', progress: 0 },
  { id: 17, title: 'Optimization', description: 'Improve efficiency and performance', progress: 0 },
  { id: 18, title: 'Scalability', description: 'Handle growing complexity with ease', progress: 0 },
  { id: 19, title: 'Mastery Test', description: 'Prove your expertise with a final exam', progress: 0 },
  { id: 20, title: 'Final Boss', description: 'The ultimate challenge — conquer it all', progress: 0 },
];
