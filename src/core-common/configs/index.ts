import { AppConfig, registeredAppConfig } from './app.config';
import { AuthConfig, registeredAuthConfig } from './auth.config';
import { DatabaseConfig, registeredDatabaseConfig } from './database.config';
import { HelperConfig, registeredHelperConfig } from './helper.config';

export const configs = [
  registeredAppConfig,
  registeredDatabaseConfig,
  registeredHelperConfig,
  registeredAuthConfig,
];

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  helper: HelperConfig;
  auth: AuthConfig;
};
