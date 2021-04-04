import { Component, OnInit } from '@angular/core'
import {
  ReceiptDto,
  ReceiptOverviewDto,
  YearMonthObject,
} from '@nairobi/api-interfaces'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ReceiptService } from '../../service/receipt.service'

@Component({
  selector: 'nairobi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  readonly receipts: Observable<YearMonthObject>
  readonly monthly: Observable<ReceiptDto[]>

  constructor(private readonly receiptService: ReceiptService) {
    const overview = this.receiptService.findOverviewData()
    this.receipts = overview.pipe(map((_) => _.receipts))
    this.monthly = overview.pipe(map((_) => _.monthlyReceipts))
  }

  ngOnInit(): void {}
}
