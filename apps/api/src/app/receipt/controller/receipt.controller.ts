import { CreateReceiptDto } from '@nairobi/api-interfaces'
import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ReceiptService } from '../service/receipt.service'

@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@Body() data: CreateReceiptDto) {
    return this.receiptService.create(data)
  }

  @Get()
  getAll() {
    return this.receiptService.findAll()
  }

  @Get(':year/month/:month')
  getMonth(@Param('year') year: string, @Param('month') month: string) {
    return this.receiptService.findReceiptsForMonth(
      parseInt(year),
      parseInt(month),
    )
  }

  @Get('overview')
  getOverviewDate() {
    return this.receiptService.findReceiptOverview()
  }
}
