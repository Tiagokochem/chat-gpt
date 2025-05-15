import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() body: { content: string; role: 'user' | 'assistant'; chatId: number }) {
    return this.messagesService.create(body.content, body.role, body.chatId);
  }

  @Get('chat/:chatId')
  getByChat(@Param('chatId') chatId: number) {
    return this.messagesService.findByChat(chatId);
  }
}
