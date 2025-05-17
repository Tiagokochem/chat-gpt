import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Chat } from '../chats/chat.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(() => Chat, chat => chat.user)
    chats: Chat[];
}
