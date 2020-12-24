import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, TreeRepository } from 'typeorm'
import { Task, TaskList } from './task.entity'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TreeRepository<Task>,
  ) { }

  async getTask(id: string): Promise<Task> {
    const result = await this.taskRepository.findOne({ where: { id }, relations: ['user'] })
    if (result) {
      const { children } = await this.taskRepository.findDescendantsTree(result)
      const { parent } = await this.taskRepository.findAncestorsTree(result)
      return { ...result, children, parent };
    } else {
      throw new NotFoundException('찾을 수 없는 태스크입니다.');
    }
  }

  async getPublicTaskList(): Promise<TaskList> {
    const trees = await this.findTreesWithUserAttached()
    const items = trees.filter((task) => task.isPublic)

    return { items }
  }

  async getMyTaskList(userId: number): Promise<TaskList> {
    const trees = await this.findTreesWithUserAttached()
    const items = trees.filter((task) => task.user.id === userId)

    return { items }
  }

  private async findTreesWithUserAttached(): Promise<Task[]> {
    const trees = await this.taskRepository.findTrees()

    const rootTasks = await this.taskRepository.find({
      where: { id: In(trees.map((task) => task.id)) },
      relations: ['user'],
    })

    return trees.map((task) => {
      return {
        ...task,
        ...rootTasks.find((t) => t.id == task.id),
      }
    })
  }
}
