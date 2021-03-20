import { Controller, Get } from '@nestjs/common'

import { Message } from '@nairobi/api-interfaces'

import { AppService } from './app.service'
import { environment } from '../environments/environment'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getData(): boolean {
    return environment.production
  }
}
