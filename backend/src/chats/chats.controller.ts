import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
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

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.chatsService.delete(id);
  }

}
