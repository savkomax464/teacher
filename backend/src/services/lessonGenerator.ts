import OpenAI from 'openai';

export function createGroqClient(apiKey: string) {
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1',
  });
}

interface LessonPlan {
  number: number;
  title: string;
  description: string;
}

interface LessonStep {
  number: number;
  title: string;
  theory: string;
  practice: string;
}

interface LessonContent {
  essence: string;
  rules: string[];
  example: string;
  pitfalls: string[];
}

export async function generateLessonPlan(
  apiKey: string,
  subject: string,
  description: string,
  level: string = 'Advanced'
): Promise<LessonPlan[]> {
  const groq = createGroqClient(apiKey);
  const prompt = `Действуй как эксперт-методист и профессиональный преподаватель по теме "${subject}". Твоя задача — разработать пошаговый учебный план, состоящий ровно из 20 уроков СТРОГО ПО ТЕМЕ "${subject}".

ТЕМА КУРСА: ${subject}
АУДИТОРИЯ И УРОВЕНЬ: ${level}
ГЛАВНАЯ ЦЕЛЬ КУРСА: ${description}

КРИТИЧЕСКИ ВАЖНО: ВСЕ 20 УРОКОВ ДОЛЖНЫ БЫТЬ ТОЛЬКО ПО ТЕМЕ "${subject}". Никаких других предметов или тем!

КРИТИЧЕСКОЕ ОГРАНИЧЕНИЕ: Твой итоговый ответ ДОЛЖЕН СТРОГО уложиться в 2048 символов.

ЧТОБЫ УЛОЖИТЬСЯ В ЛИМИТ, СОБЛЮДАЙ ЭТИ ПРАВИЛА:
1. НИКАКОЙ ВОДЫ: Категорически запрещены приветствия, вступления, заключения, обобщения, советы и любые рассуждения.
2. СРАЗУ К ДЕЛУ: Твой ответ должен начинаться символами "1." и заканчиваться последним словом 20-го пункта.
3. ЖЕСТКИЙ ФОРМАТ УРОКА: Пиши в телеграфном стиле. На каждый урок выделяй максимум 1-2 коротких предложения (до 10-15 слов).
4. ШАБЛОН ПУНКТА: "№. [Короткое название]: [Глагол действия — что конкретно нужно сделать или изучить]".
5. СТРОГО ПО ТЕМЕ: Используй только материалы, термины и примеры, относящиеся к "${subject}".

ПРИМЕРЫ ФОРМАТА (адаптируй под свою тему):
Для языка программирования:
1. Введение в синтаксис: Изучить базовые команды и написать первую программу.
Для иностранного языка:
1. Алфавит и произношение: Выучить буквы и правила чтения базовых звуков.
Для математики:
1. Основы алгебры: Изучить переменные и простейшие уравнения.

Сгенерируй ровно 20 уроков по этому формату прямо сейчас, начиная с пункта 1.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const content = response.choices[0].message.content || '';
  return parseLessonPlan(content);
}

export async function generateLessonSteps(
  apiKey: string,
  lessonTitle: string,
  lessonDescription: string,
  subject: string
): Promise<LessonStep[]> {
  const groq = createGroqClient(apiKey);
  const prompt = `Действуй как эксперт-преподаватель по теме "${subject}". Твоя задача — детально, но максимально лаконично и без «воды» расписать план изучения одного конкретного урока СТРОГО ПО ТЕМЕ "${subject}".

ПРЕДМЕТ: ${subject}
ТЕМА УРОКА: ${lessonTitle}: ${lessonDescription}

КРИТИЧЕСКИ ВАЖНО: ВСЕ ШАГИ ДОЛЖНЫ БЫТЬ ТОЛЬКО ПО ТЕМЕ "${subject}". Используй только материалы, термины и примеры, относящиеся к этому предмету.

ЗАДАНИЕ: Разбей этот урок строго на 10 последовательных шагов. Шаги должны вести от основ к полному освоению темы урока.

КРИТИЧЕСКОЕ ОГРАНИЧЕНИЕ: Твой итоговый ответ ДОЛЖЕН СТРОГО уложиться в 2048 символов. Никаких исключений.

ЧТОБЫ УЛОЖИТЬСЯ В ЛИМИТ И ДАТЬ МАКСИМУМ ПОДРОБНОСТЕЙ:
1. КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНЫ: приветствия, вступления, выводы, мотивационные фразы и любые слова вне списка.
2. СРАЗУ К ДЕЛУ: Твой ответ должен начинаться с "1." и заканчиваться последним словом десятого пункта.
3. ИНФОРМАЦИОННАЯ ПЛОТНОСТЬ: Пиши емко. На каждый шаг выделяй 2-3 коротких предложения (максимум 150-180 символов на пункт).
4. ШАБЛОН ПУНКТА: Используй строгую структуру:
"№. [Название подтемы]: [Что конкретно я узнаю в теории]. Практика: [Что я сделаю для закрепления]".

ПРИМЕРЫ ФОРМАТА (адаптируй под свою тему):
Для программирования:
1. Понятие цикла for: Изучение синтаксиса и принципа итерации. Практика: Написать цикл, выводящий числа от 1 до 10.
Для иностранного языка:
1. Present Simple: Изучение правил образования и случаев употребления. Практика: Составить 5 предложений о своем распорядке дня.
Для математики:
1. Квадратные уравнения: Изучение формулы дискриминанта и алгоритма решения. Практика: Решить 3 уравнения разной сложности.

Выдай ровно 10 шагов по этому шаблону прямо сейчас.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const content = response.choices[0].message.content || '';
  return parseLessonSteps(content);
}

export async function generateLessonContent(
  apiKey: string,
  stepTitle: string,
  stepTheory: string,
  stepPractice: string,
  subject: string
): Promise<LessonContent> {
  const groq = createGroqClient(apiKey);
  const prompt = `Действуй как выдающийся эксперт и автор академических справочников по теме "${subject}". Твоя задача — написать максимально плотный, глубокий и информативный учебный материал по одному конкретному пункту СТРОГО ПО ТЕМЕ "${subject}", используя каждую букву с пользой.

ПРЕДМЕТ: ${subject}
ТЕМА ДЛЯ ИЗУЧЕНИЯ: ${stepTitle}: ${stepTheory} Практика: ${stepPractice}

КРИТИЧЕСКИ ВАЖНО: ВЕСЬ КОНТЕНТ ДОЛЖЕН БЫТЬ ТОЛЬКО ПО ТЕМЕ "${subject}". Используй только материалы, термины, примеры и практические задания, относящиеся к этому предмету.

КРИТИЧЕСКОЕ ОГРАНИЧЕНИЕ: Твой итоговый ответ ДОЛЖЕН СТРОГО уложиться в 2048 символов.

ПРАВИЛА ДЛЯ МАКСИМАЛЬНОЙ ПЛОТНОСТИ ИНФОРМАЦИИ:
1. АБСОЛЮТНЫЙ НОЛЬ ВОДЫ: Категорически запрещены любые приветствия, введения, заключения и фразы вроде "В этом уроке мы изучим..." или "Надеюсь, это было полезно".
2. КОНЦЕНТРАТ ФАКТОВ: Никаких лирических отступлений. Пиши только сухие факты, определения, принципы работы, правила и примеры.
3. КОМПАКТНОСТЬ: Объединяй смежные мысли. Используй сложные предложения для экономии места, но сохраняй читаемость.
4. СТРОГАЯ СТРУКТУРА КОНСПЕКТА:
   - Суть: Определение и механика работы концепции в 2-3 предложениях.
   - Ключевые правила: Сжатое перечисление важнейших свойств (коротко).
   - Пример: Самый наглядный практический пример СТРОГО ПО ТЕМЕ "${subject}".
   - Подводные камни/Нюансы: 1-2 неочевидные вещи или частые ошибки.

Начинай ответ СРАЗУ с текста "Суть:", не трать символы на повторение заголовка. Пиши так, будто каждое слово стоит денег.`;

  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 2048,
  });

  const content = response.choices[0].message.content || '';
  return parseLessonContent(content);
}

function parseLessonPlan(content: string): LessonPlan[] {
  const lines = content.split('\n').filter(line => line.trim());
  const lessons: LessonPlan[] = [];

  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s*([^:]+):\s*(.+)$/);
    if (match) {
      const [, number, title, description] = match;
      lessons.push({
        number: parseInt(number),
        title: title.trim(),
        description: description.trim(),
      });
    }
  }

  return lessons.slice(0, 20);
}

function parseLessonSteps(content: string): LessonStep[] {
  const lines = content.split('\n').filter(line => line.trim());
  const steps: LessonStep[] = [];

  for (const line of lines) {
    const match = line.match(/^(\d+)\.\s*([^:]+):\s*([^.]+)\.\s*Практика:\s*(.+)$/);
    if (match) {
      const [, number, title, theory, practice] = match;
      steps.push({
        number: parseInt(number),
        title: title.trim(),
        theory: theory.trim(),
        practice: practice.trim(),
      });
    }
  }

  return steps.slice(0, 10);
}

function parseLessonContent(content: string): LessonContent {
  const sections = content.split(/(?=Суть:|Ключевые правила:|Пример:|Подводные камни|Нюансы:)/i);

  let essence = '';
  let rules: string[] = [];
  let example = '';
  let pitfalls: string[] = [];

  for (const section of sections) {
    if (section.startsWith('Суть:')) {
      essence = section.replace('Суть:', '').trim();
    } else if (section.match(/Ключевые правила:/i)) {
      const rulesText = section.replace(/Ключевые правила:/i, '').trim();
      rules = rulesText.split(/[•\-\n]/).filter(r => r.trim()).map(r => r.trim());
    } else if (section.match(/Пример:/i)) {
      example = section.replace(/Пример:/i, '').trim();
    } else if (section.match(/Подводные камни|Нюансы:/i)) {
      const pitfallsText = section.replace(/Подводные камни[:/]?|Нюансы:/gi, '').trim();
      pitfalls = pitfallsText.split(/[•\-\n]/).filter(p => p.trim()).map(p => p.trim());
    }
  }

  return { essence, rules, example, pitfalls };
}
