import OpenAI from 'openai';

export interface Env {
  GROQ_API_KEY: string;
  TELEGRAM_BOT_TOKEN: string;
  DB: D1Database;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class AIService {
  private groq: OpenAI;

  constructor(apiKey: string) {
    this.groq = new OpenAI({
      apiKey,
      baseURL: 'https://api.groq.com/openai/v1',
    });
  }

  async getChatResponse(
    teacherName: string,
    teacherSubject: string,
    teacherDescription: string,
    lessonTitle: string,
    lessonEssence: string,
    userMessage: string,
    chatHistory: ChatMessage[]
  ): Promise<string> {
    const systemPrompt = `You are ${teacherName}, an AI teacher specializing in ${teacherSubject}.
Your teaching style: ${teacherDescription}

Current lesson: ${lessonTitle}
Lesson focus: ${lessonEssence}

IMPORTANT INSTRUCTIONS:
- Adapt your teaching approach to the subject matter (${teacherSubject})
- If teaching programming/coding: use code examples, technical explanations, and programming concepts
- If teaching languages (English, Spanish, French, German, etc.):
  * Provide MANY examples and sentences in the TARGET language being taught
  * Give explanations and grammar rules in Russian (the student's native language)
  * Practice exercises should be in the TARGET language with Russian instructions
  * Use real-world conversational examples in the target language
  * Focus on vocabulary, grammar, pronunciation, and practical usage
  * Example format: "Present Simple используется для... Example: 'I work every day', 'She likes coffee'"
- If teaching other subjects: use relevant examples and explanations appropriate to that field
- Always be helpful, encouraging, and provide clear explanations
- Use examples that match the subject context
- Keep responses concise and educational
- Never force programming analogies when teaching non-technical subjects`;

    // Ограничиваем историю последними 20 сообщениями (10 пар вопрос-ответ)
    const recentHistory = chatHistory.slice(-20);

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...recentHistory,
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await this.groq.chat.completions.create({
        model: 'llama-3.1-8b-instant',
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 500,
      });

      return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Groq API error:', error);
      throw new Error('Failed to get AI response');
    }
  }
}
