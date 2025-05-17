import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Post()
  create(@Body() body: { title: string, userId: number }) {
    return this.chatsService.create(body.title, body.userId);
  }
}
