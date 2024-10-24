import { NestFactory } from '@nestjs/core';

import { ExternalAppModule } from './external-app.module';

async function bootstrap() {
  const app = await NestFactory.create(ExternalAppModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
