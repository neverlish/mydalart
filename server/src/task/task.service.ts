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

  async getTask(id: number, userId?: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    })
    if (task) {
      const { children } = await this.taskRepository.findDescendantsTree(task)
      const { parent } = await this.taskRepository.findAncestorsTree(task)
      return {
        ...task,
        children,
        parent,
        isMine: task.user.id === userId,
      };
    } else {
      throw new NotFoundException('찾을 수 없는 태스크입니다.');
    }
  }

  async getPublicTaskList(userId?: number): Promise<TaskList> {
    const trees = await this.findTreesWithUserAttached(userId) // TODO: querybuilder로 개선해야 함
    const items = trees.filter((task) => task.isPublic)

    return { items }
  }

  async getMyTaskList(userId: number): Promise<TaskList> {
    const trees = await this.findTreesWithUserAttached(userId) // TODO: querybuilder로 개선해야 함
    const items = trees.filter((task) => task.user.id === userId)

    return { items }
  }

  private async findTreesWithUserAttached(userId?: number): Promise<Task[]> {
    const trees = await this.taskRepository.findTrees()

    const rootTasks = await this.taskRepository.find({
      where: { id: In(trees.map((task) => task.id)) },
      relations: ['user'],
    })

    return trees.map((task) => {
      const rootTask = rootTasks.find((t) => t.id == task.id)
      return {
        ...task,
        user: rootTask.user,
        isMine: rootTask.user.id === userId,
      }
    })
  }
}
