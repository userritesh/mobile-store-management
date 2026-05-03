import { Component } from '@angular/core';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent {
  selectedProduct:any
  today = new Date();
  total: any;

  constructor(private sellingService:CommonServiceTsService){

  }

 ngOnInit(){
    this.sellingService.getdata().subscribe(product=>{
      this.selectedProduct =product;
this.total = (this.selectedProduct || []).reduce((sum: number, item: any) => sum + Number(item?.price || 0), 0);    }); 
  }
          // <!-- fields = ['id', 'category', 'item_name', 'brand', 'quantity', 'unit_price', 'total_price'] -->

}
