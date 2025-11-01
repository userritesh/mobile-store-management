import { Component } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/form-controls/input/input.component';
import { GridModel } from 'src/app/shared/components/grid/grid-model.model';
import { AgGridDataModelPurchaseForm } from './product.model';

@Component({
  selector: 'app-product',
  templateUrl:'./product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  todayDate = new Date();
  agGridDataModel!: GridModel;



  ngOnInit(): void {
    this.agGridDataModel = AgGridDataModelPurchaseForm;
  }

  
  onSave(){
    
  }
  

}
