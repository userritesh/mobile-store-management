import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './pages/report-dashboard/report-dashboard.component';
import { WritePreviewComponent } from './pages/write-preview/write-preview.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportDashboardComponent,
    WritePreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    
  ],
    
  exports:[ReportDashboardComponent,WritePreviewComponent]
})
export class ReportsModule { }
