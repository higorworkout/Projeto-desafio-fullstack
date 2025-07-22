import { User } from '@modules/users/entities/User';
import { Task } from '@modules/tasks/entities/Task';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carregar .env com base no ambiente
let envFile: string | null = null;

switch (process.env.NODE_ENV) {
  case 'docker':
    envFile = '.env.docker';
    break;
  case 'development':
    envFile = '.env';
    break;
  case 'production':
    envFile = null;
    break;
}


if (envFile) {
  dotenv.config({ path: path.resolve(process.cwd(), envFile) });
}

console.log(process.env.DB_HOST);
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.NODE_ENV === 'test' ? 'task_manager_test' : 'task_manager',
  entities: [User, Task],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
});


