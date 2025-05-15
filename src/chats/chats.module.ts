import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { User } from '../users/user.entity';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
  imports: [TypeOrmModule.forFeature([Chat, User])]
})
export class ChatsModule {}
