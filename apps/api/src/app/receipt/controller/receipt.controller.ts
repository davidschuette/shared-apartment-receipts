import {
  CreateReceiptDto,
  ReceiptDto,
  UpdateReceiptDto,
} from '@nairobi/api-interfaces'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiQuery } from '@nestjs/swagger'
import { ReceiptService } from '../service/receipt.service'

@Controller('receipts')
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post()
  create(@Body() data: CreateReceiptDto) {
    return this.receiptService.create(data)
  }

  @Get()
  @ApiQuery({ name: 'year', type: 'number', required: false })
  @ApiQuery({ name: 'month', type: 'number', required: false })
  @ApiQuery({ name: 'monthly', type: 'boolean', required: false })
  getAll(
    @Query('year') year?: string,
    @Query('month') month?: string,
    @Query('monthly') monthly?: string,
  ) {
    let boolMonthly = undefined
    if (monthly === 'true') {
      boolMonthly = true
    } else if (monthly === 'false') {
      boolMonthly = false
    }
    return this.receiptService.findAll(year, month, boolMonthly)
  }

  @Get(':year/month/:month')
  getMonth(@Param('year') year: string, @Param('month') month: string) {
    return this.receiptService.findReceiptsForMonth(
      parseInt(year),
      parseInt(month),
    )
  }

  @Get('overview')
  @ApiQuery({ name: 'year', type: 'number', required: false })
  @ApiQuery({ name: 'month', type: 'number', required: false })
  getOverviewDate(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ) {
    return this.receiptService.findReceiptOverview(year, month)
  }

  @Get('one/:receiptId')
  findOne(@Param('receiptId') receiptId: string): Promise<ReceiptDto> {
    return this.receiptService.findOne(receiptId)
  }

  @Put('one/:receiptId')
  update(
    @Param('receiptId') receiptId: string,
    @Body() data: UpdateReceiptDto,
  ): Promise<ReceiptDto> {
    return this.receiptService.update(receiptId, data)
  }

  @Delete('one/:receiptId')
  @HttpCode(204)
  delete(@Param('receiptId') receiptId: string): Promise<void> {
    return this.receiptService.delete(receiptId)
  }
}
