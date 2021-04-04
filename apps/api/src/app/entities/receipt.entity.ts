import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  payer: User

  @ManyToMany(() => User, (user) => user.id, {
    onUpdate: 'RESTRICT',
    onDelete: 'RESTRICT',
  })
  @JoinTable()
  affected: User[]

  @Column({ default: false })
  monthly: boolean
}
