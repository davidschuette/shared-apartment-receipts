import { Component, OnInit } from '@angular/core'
import { CreateReceiptDto, UserDto } from '@nairobi/api-interfaces'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReceiptService } from '../../service/receipt.service'
import { take } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'nairobi-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss'],
})
export class CreateReceiptComponent implements OnInit {
  readonly createForm = this.fb.group({
    amount: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
    shop: this.fb.control('', Validators.required),
    monthly: this.fb.control(false, Validators.required),
    payer: this.fb.control(null, Validators.required),
    affected: this.fb.control(null, Validators.required),
    date: this.fb.control(null, Validators.required),
  })
  readonly users: Observable<UserDto[]>

  constructor(
    private readonly fb: FormBuilder,
    private readonly receiptService: ReceiptService,
    private readonly userService: UserService,
  ) {
    this.users = this.userService.findAll()
  }

  ngOnInit(): void {}

  submit(form: FormGroup) {
    if (form.enabled && form.valid) {
      form.disable()
      const value = form.value as any
      value.date = value.date + 'T00:00:00.000Z'

      this.receiptService
        .create(value)
        .pipe(take(1))
        .subscribe(
          (data) => {},
          (err) => {
            form.enable()
          },
        )
    }
  }
}
