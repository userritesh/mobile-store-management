import { Component, } from '@angular/core';
import { sellingItemsGrid } from './salling-details-dashboard.module';
import { GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-salling-details-dashboard',
  templateUrl: './salling-details-dashboard.component.html',
  styleUrls: ['./salling-details-dashboard.component.scss']
})
export class SallingDetailsDashboardComponent {

  private gridApi: any;
   onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    console.log('Grid ready in parent');
    this.gridApi.sizeColumnsToFit();

   
  }
    gridData :any = sellingItemsGrid;
  onMobileClick(event: any) {
    console.log('Row clicked:', event);
  }

}
