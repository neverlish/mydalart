import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import * as jwt from 'jsonwebtoken'

export function validateToken(auth: string) {
  if (auth.split(' ')[0] !== 'Bearer') {
    throw new ForbiddenException('Invalid token')
  }

  const token = auth.split(' ')[1]
  try {
    const decoded = jwt.verify(token, 'SECRET') // TODO: 바꿔야 함
    return decoded
  } catch (err) {
    const message = 'Token error: ' + (err.message || err.name)
    throw new ForbiddenException(message)
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    if (!req.headers.authorization) {
      return false
    }

    req.user = validateToken(req.headers.authorization)

    return true
  }
}
