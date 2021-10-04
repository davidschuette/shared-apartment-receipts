import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { UserDto } from '@nairobi/api-interfaces'
import { Observable, Subscription } from 'rxjs'
import { ReceiptService } from '../../service/receipt.service'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'nairobi-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss'],
})
export class CreateReceiptComponent implements OnInit, OnDestroy {
  readonly createForm = this.fb.group({
    amount: this.fb.control(1.5, [Validators.required, Validators.min(0.01)]),
    shop: this.fb.control('', Validators.required),
    monthly: this.fb.control(false, Validators.required),
    payer: this.fb.control(null, Validators.required),
    affected: this.fb.control(null, Validators.required),
    date: this.fb.control(
      new Date().toJSON().split('T')[0],
      Validators.required,
    ),
  })
  readonly users: Observable<UserDto[]>
  private readonly subscription: Subscription = new Subscription()

  constructor(
    private readonly fb: FormBuilder,
    private readonly receiptService: ReceiptService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
    this.users = this.userService.findAll()
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  submit(form: FormGroup) {
    if (form.enabled && form.valid) {
      form.disable()
      const value = form.value as any
      value.date = value.date

      this.subscription.add(
        this.receiptService.create(value).subscribe(
          (data) => {
            form.reset()
            form.enable()
          },
          (err) => form.enable(),
        ),
      )
    }
  }
}
