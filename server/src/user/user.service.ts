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

  async getMyUser(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } })
  }

  async signIn(email: string): Promise<SignInResult> {
    const user = await this.getUserByEmail(email)
    if (user) {
      return { token: user.token }
    } else {
      throw new BadRequestException('존재하지 않는 계정입니다.')
    }
  }

  async signUp(email: string): Promise<SignUpResult> {
    const user = await this.getUserByEmail(email)
    if (user) {
      throw new BadRequestException('이미 존재하는 계정입니다.')
    } else {
      const newUser = await this.userRepository.create({ email })
      await this.userRepository.save(newUser)
      return { token: newUser.token }
    }
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } })
  }
}
