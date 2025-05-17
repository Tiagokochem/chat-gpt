import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Chat } from '../chats/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  role: 'user' | 'assistant';

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Chat, chat => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat;
}
