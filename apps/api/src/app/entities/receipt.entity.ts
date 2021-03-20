import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  shop: string

  @Column({ type: 'decimal' })
  amount: number

  @Column()
  date: Date

  @Column()
  payer: User

  @Column()
  affected: User[]
}
