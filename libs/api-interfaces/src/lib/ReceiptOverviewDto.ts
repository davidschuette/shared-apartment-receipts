import { ReceiptDto } from './ReceiptDto'

export type YearMonthObject = {
  [year: number]: { [month: number]: ReceiptDto[] }
}
export class ReceiptOverviewDto {
  receipts: YearMonthObject
  monthlyReceipts: ReceiptDto[]
}
