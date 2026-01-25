import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales/sales.component';
import { RechargeComponent } from './recharge/recharge.component';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SallingDetailsDashboardComponent } from './salling-details-dashboard/salling-details-dashboard.component';
import { InputComponent } from 'src/app/shared/components/form-controls/input/input.component';


@NgModule({
  declarations: [
    SalesComponent,
    RechargeComponent,
    SallingDetailsDashboardComponent,
    SallingDetailsDashboardComponent,
  ],

  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule,    
  ],
  exports: [
    SalesComponent,
    RechargeComponent,

  ]
})
export class SalesModule { }
