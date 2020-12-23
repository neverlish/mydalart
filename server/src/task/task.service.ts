import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { Task, TaskList } from './task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TreeRepository<Task>,
  ) { }

  async getTask(id: string): Promise<Task | null> {
    const result = await this.taskRepository.findOne({ where: { id }, relations: ['user'] })
    if (result) {
      const { children } = await this.taskRepository.findDescendantsTree(result)
      const { parent } = await this.taskRepository.findAncestorsTree(result)
      return { ...result, children, parent };
    } else {
      // TODO: 데이터가 없는 경우 Exception 던짐
      return result
    }
  }

  async getPublicTaskList(): Promise<TaskList> {
    const items = await this.taskRepository.find({
      where: { parent: null, isPublic: true },
      relations: ['user'],
    });
    return { items }
  }

  async getMyTaskList(): Promise<TaskList> {
    const items = await this.taskRepository.find({
      where: { parent: null, user: 1 }, // TODO: ID 바꿔야 함
      relations: ['user'],
    });
    return { items }
  }
}
