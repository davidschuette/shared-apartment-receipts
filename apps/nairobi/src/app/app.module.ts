import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { MainModule } from './main/main.module'
import { RouterModule, Routes } from '@angular/router'
import { OverviewComponent } from './main/container/overview/overview.component'
import { CreateReceiptComponent } from './main/container/create-receipt/create-receipt.component'
import { DeductionComponent } from './main/container/deduction/deduction.component'

const routes: Routes = [
  { path: 'create', pathMatch: 'full', component: CreateReceiptComponent },
  { path: 'deduction', pathMatch: 'full', component: DeductionComponent },
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
