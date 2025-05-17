import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';


@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatRepo: Repository<Chat>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) { }

  async create(title: string, userId: number): Promise<Chat> {
    const user = await this.userRepo.findOneBy({ id: userId });
    const chat = this.chatRepo.create({ title, user });
    return this.chatRepo.save(chat);
  }

  async findByUser(userId: number): Promise<Chat[]> {
    return this.chatRepo.find({
      where: { user: { id: userId } },
      relations: ['user', 'messages'], // se quiser trazer os dados relacionados
      order: { createdAt: 'DESC' }, // opcional
    });
  }
}
