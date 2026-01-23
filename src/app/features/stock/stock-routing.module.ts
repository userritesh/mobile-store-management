import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './pages/stock-list/stock-list.component';
import { AccessoriesComponent } from '../sales/accessories/accessories.component';
import { ReportDashboardComponent } from '../reports/pages/report-dashboard/report-dashboard.component';
import { AvilabelStockComponent } from './pages/stock-list/avilabel-stock/avilabel-stock.component';

const routes: Routes = [
  { path: '', component: StockListComponent,      
    children:[
   { path: 'accessories', component: AccessoriesComponent },
  { path: 'productlist', loadChildren: () => import('../store/store.module').then(m => m.StoreModule)},
  { path: 'avilabelStock', component: AvilabelStockComponent },
  { path: 'reports', component: ReportDashboardComponent },
    ]
  },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }

