import { ArgsType, Field, ObjectType } from "@nestjs/graphql"

@ArgsType()
export class SignInArgs {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class SignInResult {
  @Field(() => String)
  token: string;
}

@ArgsType()
export class SignUpArgs {
  @Field(() => String)
  email: string;
}

@ObjectType()
export class SignUpResult {
  @Field(() => String)
  token: string;
}