import { Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';

@Module({
  providers: [TaskResolver]
})
export class TaskModule { }
