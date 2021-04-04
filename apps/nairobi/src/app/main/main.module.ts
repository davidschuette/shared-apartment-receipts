import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { OverviewComponent } from './container/overview/overview.component'
import { ListComponent } from './components/list/list.component'
import { ListItemComponent } from './components/list-item/list-item.component'
import { MonthStringPipe } from './pipes/month-string.pipe'
import { CreateReceiptComponent } from './container/create-receipt/create-receipt.component'
import { ReceiptService } from './service/receipt.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeductionComponent } from './container/deduction/deduction.component';
import { DeptDisplayComponent } from './components/dept-display/dept-display.component'

@NgModule({
  declarations: [
    OverviewComponent,
    ListComponent,
    ListItemComponent,
    MonthStringPipe,
    CreateReceiptComponent,
    DeductionComponent,
    DeptDisplayComponent,
  ],
  providers: [ReceiptService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [OverviewComponent, CreateReceiptComponent, DeductionComponent],
})
export class MainModule {}
