import { Controller, Get, Post } from '@nestjs/common'
import { UserService } from '../service/user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll()
  }

  @Post()
  create() {
    return this.userService.create()
  }
}
