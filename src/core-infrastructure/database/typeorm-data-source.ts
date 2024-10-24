import dotenv from 'dotenv';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';

import { TypeormNamingStrategy } from '@core-common/utils/typeorm-naming-strategy';

dotenv.config();

const connectionOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, 'persistence/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],
  namingStrategy: new TypeormNamingStrategy(),
};

export default new DataSource({
  ...connectionOptions,
});
