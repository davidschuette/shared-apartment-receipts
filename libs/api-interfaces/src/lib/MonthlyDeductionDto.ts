import { ReceiptDto } from './ReceiptDto'

export class MonthlyDeductionDto {
  total: number
  owes: { [ower: string]: { [payer: string]: number } }
  receipts: ReceiptDto[]
}
