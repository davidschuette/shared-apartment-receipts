import { Component, Input, OnChanges, OnInit } from '@angular/core'
import { ReceiptDto } from '@nairobi/api-interfaces'
import { registerLocaleData } from '@angular/common'
import localeDe from '@angular/common/locales/de'
registerLocaleData(localeDe, 'de')

@Component({
  selector: 'nairobi-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnChanges {
  @Input()
  receipt: ReceiptDto
  affected: string
  date: Date

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.affected = this.receipt.affected.map((_) => _.name).join(', ')
    this.date = new Date(this.receipt.date)
  }
}
