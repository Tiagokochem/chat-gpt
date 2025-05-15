import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { Chat } from '../chats/chat.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepo: Repository<Chat>,
  ) {}

  async create(content: string, role: 'user' | 'assistant', chatId: number): Promise<Message> {
    const chat = await this.chatRepo.findOneBy({ id: chatId });
    const message = this.messageRepo.create({ content, role, chat });
    return this.messageRepo.save(message);
  }

  findByChat(chatId: number): Promise<Message[]> {
    return this.messageRepo.find({
      where: { chat: { id: chatId } },
      order: { createdAt: 'ASC' }
    });
  }
}
