import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { MonthlyDeductionDto, UserDto } from '@nairobi/api-interfaces'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ReceiptService } from '../../service/receipt.service'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'nairobi-deduction',
  templateUrl: './deduction.component.html',
  styleUrls: ['./deduction.component.scss'],
})
export class DeductionComponent implements OnInit {
  readonly selectionForm = this.fb.group({
    year: this.fb.control(new Date().getFullYear()),
    month: this.fb.control(new Date().getMonth()),
  })
  monthlyDeduction: Observable<MonthlyDeductionDto>
  users: Observable<{ [id: string]: UserDto }>

  constructor(
    private readonly fb: FormBuilder,
    private readonly receiptService: ReceiptService,
    private readonly userService: UserService,
  ) {
    this.users = this.userService.findAll().pipe(
      map((input) => {
        const obj: { [id: string]: UserDto } = {}
        input.forEach((_) => (obj[_.id] = _))

        return obj
      }),
    )
  }

  ngOnInit(): void {}

  submit(form: FormGroup) {
    if (form.enabled && form.valid) {
      form.disable()
      this.monthlyDeduction = this.receiptService
        .findMonthlyDeduction(form.value.year, form.value.month)
        .pipe(tap((_) => form.enable()))
    }
  }
}
