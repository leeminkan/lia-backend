import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import {
  APP_ENVIRONMENT,
  APP_TIMEZONE,
  AppEnvironment,
  AppTimezone,
  NODE_ENVIRONMENT,
  NodeEnvironment,
} from '@core-common/constants/app.constant';
import { validateConfig } from '@core-common/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  @IsEnum(APP_ENVIRONMENT)
  APP_ENV: AppEnvironment;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  APP_DEBUG: boolean;

  @IsString()
  @IsNotEmpty()
  @IsEnum(NODE_ENVIRONMENT)
  NODE_ENV: NodeEnvironment;

  @IsString()
  @IsNotEmpty()
  @IsEnum(APP_TIMEZONE)
  TZ: AppTimezone;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  HTTP_INTERNAL_PORT: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  HTTP_EXTERNAL_PORT: number;
}

export const registeredAppConfig = registerAs<AppConfig>('app', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    appEnv: validatedValue.APP_ENV ?? APP_ENVIRONMENT.LOCAL,
    nodeEnv: validatedValue.NODE_ENV ?? NODE_ENVIRONMENT.DEVELOPMENT,
    timezone: validatedValue.TZ ?? APP_TIMEZONE.ASIA_SINGAPORE,
    debug: validatedValue.APP_DEBUG,
    httpInternalPort: validatedValue.HTTP_INTERNAL_PORT,
    httpExternalPort: validatedValue.HTTP_EXTERNAL_PORT,
  } as AppConfig;
});

export type AppConfig = {
  appEnv: string;
  debug: boolean;
  nodeEnv: string;
  timezone: string;
  httpInternalPort: number;
  httpExternalPort: number;
};
