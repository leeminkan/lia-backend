import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString } from 'class-validator';

import { validateConfig } from '@core-common/utils/validate-config';

class EnvironmentVariablesValidator {
  @IsString()
  @IsNotEmpty()
  HELPER_DEFAULT_SECRET_KEY: string;
}

export const registeredHelperConfig = registerAs<HelperConfig>('helper', () => {
  const validatedValue = validateConfig<EnvironmentVariablesValidator>(
    process.env,
    EnvironmentVariablesValidator,
  );

  return {
    saltLength: 8,
    jwt: {
      secretKey: validatedValue.HELPER_DEFAULT_SECRET_KEY,
      expirationTime: '1h',
    },
  } as HelperConfig;
});

export type HelperConfig = {
  saltLength: number;
  jwt: {
    secretKey: string;
    expirationTime: string;
  };
};
