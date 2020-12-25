import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, TreeRepository } from 'typeorm'
import { User } from '../user/user.entity'
import { Task, TaskList } from './task.entity'
import { CreateTaskInput, CreateTaskInputItem } from './task.type'

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
      if (task.isPublic || task.user.id === userId) {
        const { children } = await this.taskRepository.findDescendantsTree(task)
        const { parent } = await this.taskRepository.findAncestorsTree(task)
        return {
          ...task,
          children,
          parent,
          isMine: task.user.id === userId,
        };
      }
    }
    throw new NotFoundException('찾을 수 없는 태스크입니다.');
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

  async createTask(input: CreateTaskInput, user: User) {
    const rootTask = new Task()
    rootTask.user = user
    rootTask.isPublic = input.isPublic
    rootTask.text = input.text

    await this.taskRepository.save(rootTask)

    await this.createTaskChildren(rootTask, user, input.children)

    return await this.getTask(rootTask.id)
  }

  private async createTaskChildren(parentTask: Task, user: User, children?: CreateTaskInputItem[]) {
    if (!children) {
      return;
    }

    const createdChildren = children.map((child) => {
      const childCreated = new Task()
      childCreated.user = user
      childCreated.isPublic = parentTask.isPublic
      childCreated.text = child.text
      childCreated.parent = parentTask
      return childCreated
    })

    await this.taskRepository.save(createdChildren)

    const promiseChildren = createdChildren.map(
      async (i, j) =>
        await this.createTaskChildren(i, user, children[j].children)
    )
    await Promise.all(promiseChildren)
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
