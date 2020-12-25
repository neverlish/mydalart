import { ArgsType, Field, ID, InputType } from "@nestjs/graphql"

@ArgsType()
export class TaskArgs {
  @Field(() => ID)
  id: string
}

@InputType()
export class CreateTaskInputItem {
  @Field(() => String)
  text: string;

  @Field(() => [CreateTaskInputItem], { nullable: true })
  children?: CreateTaskInputItem[];
}

@InputType()
export class CreateTaskInput extends CreateTaskInputItem {
  @Field(() => Boolean)
  isPublic: boolean;
}