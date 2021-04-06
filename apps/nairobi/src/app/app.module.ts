import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { MainModule } from './main/main.module'
import { RouterModule, Routes } from '@angular/router'
import { OverviewComponent } from './main/container/overview/overview.component'
import { CreateReceiptComponent } from './main/container/create-receipt/create-receipt.component'
import { DeductionComponent } from './main/container/deduction/deduction.component'
import { EditReceiptComponent } from './main/container/edit-receipt/edit-receipt.component'

const routes: Routes = [
  { path: 'create', component: CreateReceiptComponent },
  { path: 'deduction', component: DeductionComponent },
  {
    path: 'receipts/:receiptId/edit',
    component: EditReceiptComponent,
  },
  { path: '', component: OverviewComponent },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MainModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
