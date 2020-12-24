import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { SignInResult, SignUpResult } from './user.type'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } })
  }

  async signIn(email: string): Promise<SignInResult> {
    const user = await this.getUserByEmail(email)
    if (user) {
      return { token: user.token }
    } else {
      throw new BadRequestException('Not found account.')
    }
  }

  async signUp(email: string): Promise<SignUpResult> {
    const user = await this.getUserByEmail(email)
    if (user) {
      throw new BadRequestException('Already exists account.')
    } else {
      const newUser = await this.userRepository.create({ email })
      await this.userRepository.save(newUser)
      return { token: newUser.token }
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } })
  }
}
