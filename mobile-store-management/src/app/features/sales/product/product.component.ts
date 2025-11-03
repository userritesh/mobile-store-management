import { Component } from '@angular/core';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
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
  selectedProduct:any = {};
  image:any;
  preview:any
  imageBase64: any;
  resData: any;

constructor(private sellingService:CommonServiceTsService){}

 ngOnInit(): void {
   this.agGridDataModel = AgGridDataModelPurchaseForm; 
   this.getAllProduct();
  }


  getAllProduct(){
    this.sellingService.getAllProducts().subscribe({
     next: (res) => {
       this.resData = res;
     }, error(err) {
       console.error(err)
     }
   });
  }



fileSelected(files:any){
  const newFile =files[0]?.file
  this.image = newFile
  this.preview = URL.createObjectURL(this.image )
  const reader = new FileReader();
  reader.onload = () => {
    this.imageBase64 = reader.result; 
  };
  reader.readAsDataURL(this.image);
}



  onSave(){
    this.selectedProduct ={ ...this.selectedProduct,image_src: this.imageBase64   }
        this.sellingService.insertUpdateProducts(this.selectedProduct).subscribe({next:(res)=>{
         if(res.isSuccess){
          this.selectedProduct= {};
          this.getAllProduct();
         }
        },error:(err)=>{
        console.error(err);   
      }})
  }
  
  cancel(){
     this.preview =null
     this.image = null
  }
  
}
