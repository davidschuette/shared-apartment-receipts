import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Receipt } from '../entities/receipt.entity'
import { User } from '../entities/user.entity'
import { ReceiptController } from './controller/receipt.controller'
import { ReceiptService } from './service/receipt.service'

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
  imports: [TypeOrmModule.forFeature([Receipt, User])],
})
export class ReceiptModule {}
