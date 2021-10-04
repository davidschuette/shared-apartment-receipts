import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
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
  date = new Date()
  receipts: Observable<YearMonthObject>
  monthly: Observable<ReceiptDto[]>
  readonly selectionForm = this.fb.group({
    year: this.fb.control(this.date.getFullYear()),
    month: this.fb.control(''),
  })

  constructor(
    private readonly receiptService: ReceiptService,
    private readonly fb: FormBuilder,
  ) {
    const overview = this.receiptService.findOverviewData(
      this.date.getFullYear().toString(),
      this.date.getMonth().toString(),
    )
    this.receipts = overview.pipe(map((_) => _.receipts))
    this.monthly = overview.pipe(map((_) => _.monthlyReceipts))
  }

  ngOnInit(): void {}

  submit(form: FormGroup) {
    if (form.enabled && form.valid) {
      form.disable()
      const year = form.value.year
      const month = form.value.month === '' ? undefined : form.value.month

      const overview = this.receiptService.findOverviewData(year, month)
      this.receipts = overview.pipe(map((_) => _.receipts))
      this.monthly = overview.pipe(map((_) => _.monthlyReceipts))

      form.enable()
    }
  }
}
