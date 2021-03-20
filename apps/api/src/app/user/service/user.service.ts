import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../../entities/user.entity'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly userRepo: Repository<User>

  findAll(): Promise<any> {
    return this.userRepo.find()
  }

  create(): Promise<any> {
    return this.userRepo.save([{ name: Date.now().toString() }])
  }
}
