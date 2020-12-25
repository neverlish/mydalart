import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { AuthGuard } from "../common/auth.guard"
import { CurrentUser, GetCurrentUser } from "../common/currentUser.decorator"
import { User } from "../user/user.entity"
import { Task, TaskList } from "./task.entity"
import { TaskService } from "./task.service"
import { CreateTaskInput, TaskArgs } from "./task.type"

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) { }

  @Query(() => Task)
  task(@Args() args: TaskArgs, @GetCurrentUser() user?: User) {
    return this.taskService.getTask(Number(args.id), user?.id)
  }

  @Query(() => TaskList)
  publicTaskList(@GetCurrentUser() user?: User) {
    return this.taskService.getPublicTaskList(user?.id)
  }

  @UseGuards(new AuthGuard())
  @Query(() => TaskList)
  myTaskList(@CurrentUser() user: User) {
    return this.taskService.getMyTaskList(user.id)
  }

  @UseGuards(new AuthGuard())
  @Mutation(() => Task)
  createTask(@Args('input') input: CreateTaskInput, @CurrentUser() user: User) {
    return this.taskService.createTask(input, user)
  }
}