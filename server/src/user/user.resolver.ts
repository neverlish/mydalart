import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'
import { SignInArgs, SignInResult, SignUpArgs, SignUpResult } from './user.type'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }
  @Query(() => User)
  myUser() {
    return this.userService.getMyUser()
  }

  @Mutation(() => SignInResult)
  signIn(@Args() args: SignInArgs) {
    return this.userService.signIn(args.email)
  }

  @Mutation(() => SignUpResult)
  signUp(@Args() args: SignUpArgs) {
    return this.userService.signUp(args.email)
  }
}
