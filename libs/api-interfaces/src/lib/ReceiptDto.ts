import { UserDto } from './UserDto'

export class ReceiptDto {
  id: string
  shop: string
  amount: number
  date: string
  month: number
  year: number
  payer: UserDto
  affected: UserDto[]
  monthly: boolean
}
