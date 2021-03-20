import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { environment } from '../../environments/environment'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ unique: true })
  name: string
}
