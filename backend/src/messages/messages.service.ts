import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { Chat } from '../chats/chat.entity';
import { OpenAiService } from './openai.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
    private readonly openai: OpenAiService,

  ) { }

  async create(content: string, role: 'user' | 'assistant', chatId: number): Promise<Message> {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ['messages'],
    });

    const userMessage = this.messageRepo.create({ content, role, chat });
    const savedUserMessage = await this.messageRepo.save(userMessage);

    // Se for usuário, chama o GPT
    if (role === 'user') {
      const history = chat.messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      history.push({ role: 'user', content });

      const gptResponse = await this.openai.chat(history);

      const assistantMessage = this.messageRepo.create({
        content: gptResponse.content,
        role: 'assistant',
        chat,
      });

      await this.messageRepo.save(assistantMessage);
    }

    return savedUserMessage;
  }

  findByChat(chatId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { chat: { id: chatId } },
      order: { createdAt: 'ASC' }
    });
  }
}
