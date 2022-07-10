import 'dotenv/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const database = process.env.DB_NAME;

export default {
  type: 'postgres',
  port: 5432,
  host,
  username,
  password,
  database,
  entities: [
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*',
    ),
    path.resolve(
      __dirname,
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*',
    ),
  ],
  synchronize: false,
  migrations: ['./dist/shared/infra/typeorm/migrations/*'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
} as TypeOrmModuleOptions;
