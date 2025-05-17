import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('ENV TEST - DB_USER:', process.env.DB_USER);

    app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
