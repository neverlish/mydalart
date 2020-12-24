import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/common/currentUser.decorator'
import { AuthGuard } from '../common/auth.guard'
import { User } from './user.entity'
import { UserService } from './user.service'
import { SignInArgs, SignInResult, SignUpArgs, SignUpResult } from './user.type'

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) { }

  @UseGuards(new AuthGuard())
  @Query(() => User)
  myUser(@CurrentUser() user: User) {
    return this.userService.getUserById(user.id)
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
