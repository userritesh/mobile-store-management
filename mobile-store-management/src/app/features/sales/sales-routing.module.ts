import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { RechargeComponent } from './recharge/recharge.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ProductDetailsComponent } from '../store/pages/product-details/product-details.component';
import { SallingDetailsDashboardComponent } from './salling-details-dashboard/salling-details-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SalesComponent,  
    //  path: '', redirectTo: 'sales', pathMatch: 'full',
    children: [
      { path: 'recharge', component: RechargeComponent },
      { path: 'accessories', component: AccessoriesComponent },
      {path:'productdetails',component:ProductDetailsComponent},
      { path: 'sallingdetails/:category', component: SallingDetailsDashboardComponent },
 
    ]
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
