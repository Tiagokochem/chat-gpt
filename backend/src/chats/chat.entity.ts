import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Message } from '../messages/message.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.chats, { eager: true })
  user: User;
  
  @OneToMany(() => Message, message => message.chat)
  messages: Message[];

}
