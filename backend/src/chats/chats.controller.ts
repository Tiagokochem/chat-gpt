import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Chat } from './chat.entity';


@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) { }

  @Get()
  async getUserChats(@Query('userId') userId: number): Promise<Chat[]> {
    return this.chatsService.findByUser(userId);
  }

  @Post()
  create(@Body() body: { title: string, userId: number }) {
    return this.chatsService.create(body.title, body.userId);
  }
}
