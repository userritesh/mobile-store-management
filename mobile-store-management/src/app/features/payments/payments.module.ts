import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentListComponent } from './pages/payment-list/payment-list.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';



@NgModule({
  declarations: [
    PaymentListComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PaymentsModule { }
