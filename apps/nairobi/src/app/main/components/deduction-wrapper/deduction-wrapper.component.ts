import { Component, Input, OnInit } from '@angular/core'
import { MonthlyDeductionDto, UserDto } from '@nairobi/api-interfaces'

@Component({
  selector: 'nairobi-deduction-wrapper',
  templateUrl: './deduction-wrapper.component.html',
  styleUrls: ['./deduction-wrapper.component.scss'],
})
export class DeductionWrapperComponent implements OnInit {
  @Input()
  monthlyDeduction: MonthlyDeductionDto

  @Input()
  users: { [id: string]: UserDto }

  constructor() {}

  ngOnInit(): void {}
}
