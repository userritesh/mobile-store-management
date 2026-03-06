import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard.component';



@NgModule({
  declarations: [
    ReportDashboardComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[ReportDashboardComponent]
})
export class ReportsModule { }
