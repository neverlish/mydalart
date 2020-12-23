import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TreeRepository } from 'typeorm'
import { Task, TaskList } from './task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TreeRepository<Task>
  ) { }

  async getTask(id: string): Promise<Task | null> {
    const result = await this.taskRepository.findOne({ where: { id } })
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
    // TODO: 태스크들의 parent는 가져오지 못하고 있는 상태
    const tasks = await this.taskRepository.findTrees()
    const items = tasks.filter((i) => i.isPublic)
    return { items }
  }
}
