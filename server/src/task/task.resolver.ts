import { Args, ArgsType, ID, Query, Resolver, Field } from "@nestjs/graphql"
import { Task, TaskList } from "./task.entity"
import { TaskService } from "./task.service"

@ArgsType()
class TaskArgs {
  @Field(() => ID)
  id: string;
}

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) { }

  @Query(() => Task)
  task(@Args() args: TaskArgs) {
    return this.taskService.getTask(args.id)
  }

  @Query(() => TaskList)
  publicTaskList() {
    return this.taskService.getPublicTaskList()
  }

  // TODO: Authorized 적용 필요
  @Query(() => TaskList)
  myTaskList() {
    return this.taskService.getMyTaskList();
  }
}