import { AppConfig, registeredAppConfig } from './app.config';
import { DatabaseConfig, registeredDatabaseConfig } from './database.config';
import { HelperConfig, registeredHelperConfig } from './helper.config';

export const configs = [
  registeredAppConfig,
  registeredDatabaseConfig,
  registeredHelperConfig,
];

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  helper: HelperConfig;
};
