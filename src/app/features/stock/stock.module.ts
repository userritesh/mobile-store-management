import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseListComponent } from './pages/purchase-list/purchase-list.component';
import { StockListComponent } from './pages/stock-list/stock-list.component';
import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '../store/store.module';
import { AccessoriesComponent } from '../sales/accessories/accessories.component';
import { ReportsModule } from '../reports/reports.module';
import { AvilabelStockComponent } from './pages/stock-list/avilabel-stock/avilabel-stock.component';



@NgModule({
  declarations: [
    PurchaseListComponent,
    StockListComponent,
    AccessoriesComponent,
    AvilabelStockComponent

  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    StoreModule,
    ReportsModule
],
  exports: [
    PurchaseListComponent,
    StockListComponent
  ]
})
export class StockModule { }
