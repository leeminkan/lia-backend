import { NestFactory } from '@nestjs/core';

import { AppCModule } from './app-c.module';

async function bootstrap() {
  const app = await NestFactory.create(AppCModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
