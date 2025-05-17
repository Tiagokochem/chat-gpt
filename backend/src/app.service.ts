import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('DB_USER:', process.env.DB_USER);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
