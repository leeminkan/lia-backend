import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import helmet from 'helmet';

import { AllConfigType } from '@core-common/configs';

import { AppBModule } from './app-b.module';

async function bootstrap() {
  const app = await NestFactory.create(AppBModule);
  const logger = new Logger();
  const configService = app.get(ConfigService<AllConfigType>);
  const port = configService.getOrThrow('app.httpInternalPort', {
    infer: true,
  });

  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
        },
      },
      crossOriginEmbedderPolicy: false, // Disable if not needed
    }),
  );
  useContainer(app.select(AppBModule), { fallbackOnErrors: true });
  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  await app.listen(port, '0.0.0.0');

  logger.log(`==========================================================`);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log(`==========================================================`);
}
bootstrap();
