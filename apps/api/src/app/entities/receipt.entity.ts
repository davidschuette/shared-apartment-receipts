import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  shop: string

  @Column({ type: 'decimal' })
  amount: number

  @Column({ type: 'date' })
  date: string

  @Column({ type: 'int' })
  month: number

  @Column({ type: 'int' })
  year: number

  @ManyToOne(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  payer: User

  @ManyToMany(() => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  affected: User[]

  @Column({ default: false })
  monthly: boolean
}
