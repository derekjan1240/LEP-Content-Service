import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8083, () => {
    Logger.log('Content Service is running on port 8083!');
  });
}
bootstrap();
