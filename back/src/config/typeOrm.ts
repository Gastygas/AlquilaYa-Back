import { config as dotenvConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import e from 'express';
dotenvConfig({ path: '.env' });
const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  autoloadEntities: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  logging: false,
  migrationsRun: true,
  synchronize: true,
  // dropSchema: true,
};
export default registerAs('typeorm', () => config);
export const connectDataSource = () =>
  new DataSource(config as DataSourceOptions);
