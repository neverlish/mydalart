import { HttpStatus } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UserService } from './user.service'

describe('UserService', () => {
  let userRepository: Repository<User>
  let userService: UserService

  beforeEach(() => {
    userRepository = new Repository<User>()
    userService = new UserService(userRepository)
  })

  const expectedUser: User = {
    id: 1,
    email: '123',
    tasks: [],
    token: 'token',
  }
  const userId = 1
  const email = 'test@email.com'

  describe('getUserById', () => {
    test('get user record by id', async () => {
      const spy_findOne = jest.spyOn(userRepository, 'findOne')
      spy_findOne.mockResolvedValue(expectedUser)

      const result = await userService.getUserById(userId)
      expect(spy_findOne).toHaveBeenCalledWith({ where: { id: 1 } })
      expect(result).toBe(expectedUser)
    })
  })

  describe('signIn', () => {
    test('succeeds signIn when user by email exists', async () => {
      const spy_getUserByEmail = jest.spyOn(userService, 'getUserByEmail')
      spy_getUserByEmail.mockResolvedValue(expectedUser)

      const result = await userService.signIn(email)
      expect(spy_getUserByEmail).toHaveBeenCalledWith(email)
      expect(result).toStrictEqual({ token: expectedUser.token })
    })

    test('fails signIn when user by email not exists', async () => {
      const spy_getUserByEmail = jest.spyOn(userService, 'getUserByEmail')
      spy_getUserByEmail.mockResolvedValue(null)

      try {
        await userService.signIn(email)
      } catch (e) {
        expect(spy_getUserByEmail).toHaveBeenCalledWith(email)
        expect(e.status).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('Not found account.')
      }
    })
  })

  describe('signUp', () => {
    test('succeeds signUp when user by email not exists', async () => {
      const spy_getUserByEmail = jest.spyOn(userService, 'getUserByEmail')
      spy_getUserByEmail.mockResolvedValue(null)

      jest.spyOn(userRepository, 'create').mockImplementation(() => expectedUser)
      jest.spyOn(userRepository, 'save').mockImplementation()

      const result = await userService.signUp(email)
      expect(spy_getUserByEmail).toHaveBeenCalledWith(email)
      expect(result).toStrictEqual({ token: expectedUser.token })
    })

    test('fails signUp when user by email not exists', async () => {
      const spy_getUserByEmail = jest.spyOn(userService, 'getUserByEmail')
      spy_getUserByEmail.mockResolvedValue(expectedUser)

      try {
        await userService.signUp(email)
      } catch (e) {
        expect(spy_getUserByEmail).toHaveBeenCalledWith(email)
        expect(e.status).toBe(HttpStatus.BAD_REQUEST)
        expect(e.message).toBe('Already exists account.')
      }
    })
  })
})