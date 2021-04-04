import { Component, Input, OnInit } from '@angular/core'
import {
  ReceiptDto,
  ReceiptOverviewDto,
  YearMonthObject,
} from '@nairobi/api-interfaces'

@Component({
  selector: 'nairobi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly oKeys = Object.keys

  @Input()
  receipts: YearMonthObject

  constructor() {}

  ngOnInit(): void {}
}
