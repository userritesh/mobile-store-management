import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SalesComponent } from './features/sales/sales/sales.component';
import { RechargeComponent } from './features/sales/recharge/recharge.component';
import { ProductComponent } from './features/sales/product/product.component';
import { SharedModule } from './shared/shared.module';
import { SalesModule } from './features/sales/sales.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    SalesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
