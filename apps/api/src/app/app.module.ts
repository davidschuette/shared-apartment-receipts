import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { environment } from '../environments/environment'
import { User } from './entities/user.entity'
import { UserModule } from './user/user.module'
import { ReceiptModule } from './receipt/receipt.module'
import { Receipt } from './entities/receipt.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: environment.database.user,
      password: environment.database.password,
      database: environment.database.name,
      entities: [User, Receipt],
      synchronize: true,
    }),
    UserModule,
    ReceiptModule,
  ],
})
export class AppModule {}
