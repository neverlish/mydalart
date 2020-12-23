import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/config';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConfig, entities: [Task, User] }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TaskModule,
    UserModule,
  ],
})
export class AppModule { }
