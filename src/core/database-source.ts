import { DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['DATABASE_HOST'],
  port: parseInt(process.env['DATABASE_PORT']),
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
  database: process.env['DATABASE_NAME'],
  entities: ['src/**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});