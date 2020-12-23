import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './db/config';
import { Task } from './task/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConfig, entities: [Task] }),
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TaskModule,
  ],
})
export class AppModule { }
