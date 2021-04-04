import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Receipt } from './receipt.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string
}
