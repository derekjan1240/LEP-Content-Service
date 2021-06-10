import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { initSwagger } from './app.swagger';

import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const micro = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
        retryAttempts: 5, // 對外request重試次數
        retryDelay: 1000, // 重試間隔
      },
    },
  );
  micro.listen(() => {
    Logger.log('Microservice is listening!');
  });

  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  initSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(8083, async () => {
    logger.log(`Content Service is running on port 8083!`);
  });
}
bootstrap();
