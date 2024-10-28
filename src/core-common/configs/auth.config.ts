import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';

import { validateConfig } from '@core-common/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  AUTH_JWT_SECRET: string;

  @IsString()
  AUTH_JWT_TOKEN_EXPIRES_IN: string;

  @IsString()
  AUTH_REFRESH_SECRET: string;

  @IsString()
  AUTH_REFRESH_TOKEN_EXPIRES_IN: string;
}

export const registeredAuthConfig = registerAs<AuthConfig>('auth', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    secret: validatedValue.AUTH_JWT_SECRET,
    expires: validatedValue.AUTH_JWT_TOKEN_EXPIRES_IN,
    refreshSecret: validatedValue.AUTH_REFRESH_SECRET,
    refreshExpires: validatedValue.AUTH_REFRESH_TOKEN_EXPIRES_IN,
  } as AuthConfig;
});

export type AuthConfig = {
  secret: string;
  expires: string;
  refreshSecret: string;
  refreshExpires: string;
};
