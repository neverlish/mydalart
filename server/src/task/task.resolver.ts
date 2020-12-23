import { Args, ArgsType, ID, Query, Resolver, Field } from "@nestjs/graphql";
import { Task } from "./task.entity";

@ArgsType()
class TaskArgs {
  @Field(() => ID)
  id: string;
}

@Resolver()
export class TaskResolver {
  @Query(() => Task, { nullable: true })
  task(@Args() args: TaskArgs) {
    return null;
  }
}