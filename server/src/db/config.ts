import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mydalart',
  entities: [],
  synchronize: true,
}