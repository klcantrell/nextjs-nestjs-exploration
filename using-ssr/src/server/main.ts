import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ServerModule } from 'server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({ origin: ['http://localhost:5173'] });
  await app.listen(3000);
}
bootstrap();
