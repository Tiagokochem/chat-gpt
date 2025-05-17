import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';

console.log('DB_USER:', process.env.DB_USER); // ✅ fora do @Module


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    ChatsModule,
    MessagesModule, 
  ],
})
export class AppModule {}
