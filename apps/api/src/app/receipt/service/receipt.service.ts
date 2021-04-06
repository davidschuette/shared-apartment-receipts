import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'
import { Receipt } from '../../entities/receipt.entity'
import { User } from '../../entities/user.entity'
import {
  CreateReceiptDto,
  ReceiptDto,
  ReceiptOverviewDto,
  UpdateReceiptDto,
} from '@nairobi/api-interfaces'

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: CreateReceiptDto): Promise<ReceiptDto> {
    const [payer, ...affected] = await Promise.all([
      this.userRepo.findOne(data.payer),
      ...data.affected.map((_) => this.userRepo.findOne(_)),
    ])
    const date = new Date(data.date)
    const year = date.getFullYear()
    const month = date.getMonth()

    return this.receiptRepo
      .save([
        {
          ...data,
          payer,
          affected,
          year,
          month,
          amount: Math.round((data.amount + Number.EPSILON) * 100) / 100,
        },
      ])
      .then((_) => _[0])
  }

  findAll(year?: string, month?: string, monthly?: boolean) {
    console.log({ year, month, monthly })
    return this.receiptRepo.find({
      relations: ['payer', 'affected'],
      where: {
        ...(year !== undefined ? { year } : {}),
        ...(month !== undefined ? { month } : {}),
        ...(monthly !== undefined ? { monthly } : {}),
      },
    })
  }

  async findReceiptsForMonth(year: number, month: number) {
    const receipts = await this.receiptRepo.find({
      relations: ['payer', 'affected'],
      where: [{ month, year }, { monthly: true }],
    })

    const owes: { [K: string]: { [K: string]: number } } = {}

    receipts.forEach((receipt) => {
      const amount = parseInt(receipt.amount + '', 10) / receipt.affected.length

      receipt.affected.forEach((user) => {
        if (user.id !== receipt.payer.id) {
          if (owes[user.id]) {
            if (owes[user.id][receipt.payer.id]) {
              owes[user.id][receipt.payer.id] += amount
            } else {
              owes[user.id][receipt.payer.id] = amount
            }
          } else {
            owes[user.id] = { [receipt.payer.id]: amount }
          }
        }
      })
    })

    for (const ower of Object.keys(owes)) {
      if (owes[ower]) {
        for (const payer of Object.keys(owes[ower])) {
          if (owes[payer] && owes[payer][ower]) {
            if (owes[payer][ower] > owes[ower][payer]) {
              owes[payer][ower] = owes[payer][ower] - owes[ower][payer]

              if (Object.keys(owes[ower]).length > 1) {
                delete owes[ower][payer]
              } else {
                delete owes[ower]
              }
            } else {
              owes[payer][ower] = owes[ower][payer] - owes[payer][ower]

              if (Object.keys(owes[payer]).length > 1) {
                delete owes[payer][ower]
              } else {
                delete owes[payer]
              }
            }
          }
        }
      }
    }

    const total = receipts.reduce(
      (prev, cur) => prev + parseInt(cur.amount + '', 10),
      0,
    )
    const a = this.receiptRepo
      .createQueryBuilder('receipt')
      .select('SUM(amount)', 'sum')
      .addSelect('receipt.payerId', 'payer')
      .groupBy(`receipt.payerId`)
      .where('month = :month AND year = :year OR monthly = true', {
        month,
        year,
      })

    return {
      receipts,
      total,
      res: await a.execute(),
      owes,
    }
  }

  async findReceiptOverview(
    year?: string,
    month?: string,
  ): Promise<ReceiptOverviewDto> {
    const [receipts, monthlyReceipts] = await Promise.all([
      this.receiptRepo.find({
        relations: ['payer', 'affected'],
        where: {
          monthly: false,
          ...(year !== undefined ? { year } : {}),
          ...(month !== undefined ? { month } : {}),
        },
      }),
      this.receiptRepo.find({
        relations: ['payer', 'affected'],
        where: {
          monthly: true,
        },
      }),
    ])

    const overviewData: { [year: number]: { [month: number]: Receipt[] } } = {}

    for (let i = 0; i < receipts.length; i++) {
      const receipt = receipts[i]
      const date = new Date(receipt.date)
      const year = date.getFullYear()
      const month = date.getMonth()

      if (overviewData[year]) {
        if (overviewData[year][month]) {
          overviewData[year][month].push(receipt)
        } else {
          overviewData[year][month] = [receipt]
        }
      } else {
        overviewData[year] = { [month]: [receipt] }
      }
    }

    return { receipts: overviewData, monthlyReceipts }
  }

  findOne(receiptId: string): Promise<ReceiptDto> {
    return this.receiptRepo.findOne(receiptId, {
      relations: ['payer', 'affected'],
    })
  }

  async update(receiptId: string, data: UpdateReceiptDto): Promise<ReceiptDto> {
    const receipt = await this.receiptRepo.findOne(receiptId, {
      relations: ['payer', 'affected'],
    })
    const [payer, ...affected] = await Promise.all([
      this.userRepo.findOne(data.payer),
      ...data.affected.map((_) => this.userRepo.findOne(_)),
    ])
    const date = new Date(data.date)

    receipt.shop = data.shop
    receipt.amount = Math.round((data.amount + Number.EPSILON) * 100) / 100
    receipt.date = data.date
    receipt.month = date.getMonth()
    receipt.year = date.getFullYear()
    receipt.payer = payer
    receipt.affected = affected
    receipt.monthly = data.monthly

    return this.receiptRepo.save(receipt)
  }

  async delete(receiptId: string): Promise<void> {
    await this.receiptRepo.delete(receiptId)
  }
}
