import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { TypeormNamingStrategy } from '@core-common/utils/typeorm-naming-strategy';
import { validateConfig } from '@core-common/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  DB_CONNECTION: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsBoolean()
  @IsNotEmpty()
  @Type(() => Boolean)
  DB_LOGGING: boolean;
}

export const registeredDatabaseConfig = registerAs<DatabaseConfig>(
  'database',
  () => {
    const validatedValue = validateConfig<EnvironmentVariablesValidator>(
      process.env,
      EnvironmentVariablesValidator,
    );

    return {
      type: validatedValue.DB_CONNECTION,
      host: validatedValue.DB_HOST,
      port: validatedValue.DB_PORT,
      username: validatedValue.DB_USERNAME,
      password: validatedValue.DB_PASSWORD,
      database: validatedValue.DB_NAME,
      logging: validatedValue.DB_LOGGING,
      timezone: 'Z',
      autoLoadEntities: true,
      keepConnectionAlive: true,
      namingStrategy: new TypeormNamingStrategy(),
    } as DatabaseConfig;
  },
);

export type DatabaseConfig = {
  type: any;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
};
