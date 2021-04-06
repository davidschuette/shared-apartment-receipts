import { Component, OnDestroy, OnInit } from '@angular/core'
import { CreateReceiptDto, UserDto } from '@nairobi/api-interfaces'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReceiptService } from '../../service/receipt.service'
import { take } from 'rxjs/operators'
import { Observable, Subscription } from 'rxjs'
import { UserService } from '../../service/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'nairobi-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.scss'],
})
export class CreateReceiptComponent implements OnInit, OnDestroy {
  readonly createForm = this.fb.group({
    amount: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
    shop: this.fb.control('', Validators.required),
    monthly: this.fb.control(false, Validators.required),
    payer: this.fb.control(null, Validators.required),
    affected: this.fb.control(null, Validators.required),
    date: this.fb.control(null, Validators.required),
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
          (data) => this.router.navigate(['/receipts', data.id, 'edit']),
          (err) => form.enable(),
        ),
      )
    }
  }
}
