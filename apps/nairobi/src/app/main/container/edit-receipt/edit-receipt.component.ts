import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ReceiptDto, UserDto } from '@nairobi/api-interfaces'
import { Observable, Subscription } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { ReceiptService } from '../../service/receipt.service'
import { UserService } from '../../service/user.service'

@Component({
  selector: 'nairobi-edit-receipt',
  templateUrl: './edit-receipt.component.html',
  styleUrls: ['./edit-receipt.component.scss'],
})
export class EditReceiptComponent implements OnInit, OnDestroy {
  id: string
  readonly editForm = this.fb.group({
    amount: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
    shop: this.fb.control('', Validators.required),
    monthly: this.fb.control(false, Validators.required),
    payer: this.fb.control(null, Validators.required),
    affected: this.fb.control(null, Validators.required),
    date: this.fb.control(null, Validators.required),
  })
  readonly users: Observable<UserDto[]>
  private readonly subscriptions: Subscription = new Subscription()

  constructor(
    private readonly route: ActivatedRoute,
    private readonly receiptService: ReceiptService,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.users = this.userService.findAll()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params
        .pipe(
          mergeMap((params) => this.receiptService.findOne(params.receiptId)),
          map((receipt) => ({
            ...receipt,
            payer: receipt.payer.id,
            affected: receipt.affected.map((_) => _.id),
          })),
        )
        .subscribe((receipt) => {
          this.id = receipt.id
          this.editForm.patchValue(receipt)
        }),
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  submit(form: FormGroup) {
    if (form.enabled && form.valid) {
      form.disable()

      this.subscriptions.add(
        this.receiptService
          .update(this.id, form.value)
          .pipe(
            map((receipt) => ({
              ...receipt,
              payer: receipt.payer.id,
              affected: receipt.affected.map((_) => _.id),
            })),
          )
          .subscribe((receipt) => {
            this.id = receipt.id
            form.patchValue(receipt)
            form.enable()
          }),
      )
    }
  }

  delete() {
    this.subscriptions.add(
      this.receiptService
        .delete(this.id)
        .subscribe(() => this.router.navigate(['/'])),
    )
  }
}
