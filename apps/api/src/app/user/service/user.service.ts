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
    return this.userRepo.save([
      { id: '5b6014fb-2477-430b-b04e-0ad759314009', name: 'Juli' },
      { id: '0b55f116-a080-4344-bd89-ca027fbb162a', name: 'Dave' },
      { id: '2b09159b-3076-46b8-8a40-02195eee3312', name: 'Brian' },
    ])
  }
}
