import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './message.entity';
import { Chat } from '../chats/chat.entity';
import { OpenAiService } from './openai.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Chat])],
  controllers: [MessagesController],
  providers: [MessagesService, OpenAiService],

})
export class MessagesModule { }
