import { Component, } from '@angular/core';
import { sellingItemsGrid } from './salling-details-dashboard.module';
import { GridReadyEvent } from 'ag-grid-community';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salling-details-dashboard',
  templateUrl: './salling-details-dashboard.component.html',
  styleUrls: ['./salling-details-dashboard.component.scss']
})
export class SallingDetailsDashboardComponent {
 constructor(private route: ActivatedRoute) {}
  private gridApi: any;
  filteredData:any [] = [];
  gridData :any = sellingItemsGrid;
   ngOnInit() { 
    this.route.params.subscribe(params => {
      const category = params['category']; 
      this.filteredData = this.gridData.rowData.filter((row: any) => row.category === category);
      console.log(this.filteredData)
      if (this.filteredData) {
        this.gridApi.setRowData(this.filteredData);
      }
    });
  }

  onMobileClick(event: any) {
    console.log('Row clicked:', event);
  }

}
