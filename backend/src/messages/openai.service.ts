import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chat(messages: { role: 'user' | 'assistant'; content: string }[]) {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    return response.choices[0].message;
  }
}
