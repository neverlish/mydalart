import { UseGuards } from "@nestjs/common";
import { Args, ArgsType, Field, ID, Query, Resolver } from "@nestjs/graphql"
import { AuthGuard } from "../common/auth.guard"
import { CurrentUser, GetCurrentUser } from "../common/currentUser.decorator"
import { User } from "../user/user.entity"
import { Task, TaskList } from "./task.entity"
import { TaskService } from "./task.service"

@ArgsType()
class TaskArgs {
  @Field(() => ID)
  id: string
}

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
    return this.taskService.getMyTaskList(user.id);
  }
}