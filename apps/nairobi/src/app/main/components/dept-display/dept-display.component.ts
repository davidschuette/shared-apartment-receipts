import { Component, Input, OnInit } from '@angular/core'
import { MonthlyDeductionDto, UserDto } from '@nairobi/api-interfaces'

@Component({
  selector: 'nairobi-dept-display',
  templateUrl: './dept-display.component.html',
  styleUrls: ['./dept-display.component.scss'],
})
export class DeptDisplayComponent implements OnInit {
  readonly oKeys = Object.keys

  @Input()
  data: MonthlyDeductionDto

  @Input()
  users: { [id: string]: UserDto }

  constructor() {}

  ngOnInit(): void {}
}
