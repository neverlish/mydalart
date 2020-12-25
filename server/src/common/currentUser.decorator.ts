import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { validateToken } from './auth.guard'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req.user
  },
)

export const GetCurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    if (!req.headers.authorization) {
      return null
    }

    try {

      return validateToken(req.headers.authorization);
    } catch {
      return null
    }

  },
)