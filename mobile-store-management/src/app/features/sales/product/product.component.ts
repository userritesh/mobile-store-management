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
  productcategory!:string;
  image:any;
  preview:any
  // support multiple images
  previewList: any[] = [];
  imageBase64List: any[] = [];
  // list of items staged before saving
  addedProducts: any[] = [];
  resData: any;
  dropdowndata: any;

constructor(private sellingService:CommonServiceTsService){}

 ngOnInit(): void {
   this.agGridDataModel = AgGridDataModelPurchaseForm; 
   this.getAllCategory();
   this.getAllProduct();
  }

getAllCategory(){
  this.sellingService.getcategoryDropdown().subscribe({
     next: (res) => {
         this.dropdowndata = res;
     }, error(err) {
       console.error(err)
     }
   });
}

onAddItem(): void {

  this.resData.push({
    ...this.selectedProduct
  });

  // Refresh grid
  this.resData = [...this.resData];

  // Clear form
  this.selectedProduct = {};
} 
// getProductSubcategory(){
//   this.sellingService.getProductSubcategory().subscribe({
//      next: (res) => {
//          this.dropdowndata = res;
//      }, error(err) {
//        console.error(err)
//      }
//    });
// }

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
  const newFiles = files?.addedFiles || [];
  // reset current selections
  // allow multiple images to be selected
  for (const f of newFiles) {
    const file = f as File;
    this.previewList.push(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = (() => {
      return (e: any) => {
        this.imageBase64List.push(e.target.result);
      };
    })();
    reader.readAsDataURL(file);
  }
}



  /** Save a single product (legacy) */
  onSave(){
    const payload = { ...this.selectedProduct, images: this.imageBase64List, quantity: this.selectedProduct?.quantity || 1 };
    this.sellingService.insertUpdateProducts(payload).subscribe({next:(res)=>{
         if(res.isSuccess){
          this.selectedProduct= {};
          this.previewList = [];
          this.imageBase64List = [];
          this.getAllProduct();
         }
        },error:(err)=>{
        console.error(err);   
      }})
  }

  /** Add current form as a staged item (appears in the grid below) */
  addToList(){
    const item = { ...this.selectedProduct, images: this.imageBase64List.slice(), quantity: this.selectedProduct?.quantity || 1 };
    this.addedProducts.push(item);
    // reset form state for next entry
    this.selectedProduct = {};
    this.previewList = [];
    this.imageBase64List = [];
  }

  /** Save all staged items to backend and refresh product list */
  saveAll(){
    if(!this.addedProducts.length){
      // nothing staged, fallback to single save
      this.onSave();
      return;
    }
    let completed = 0;
    for(const p of this.addedProducts){
      this.sellingService.insertUpdateProducts(p).subscribe({next: (res)=>{
        completed++;
        if(completed === this.addedProducts.length){
          this.addedProducts = [];
          this.getAllProduct();
        }
      }, error: (err)=>{
        console.error(err);
        completed++;
        if(completed === this.addedProducts.length){
          this.addedProducts = [];
          this.getAllProduct();
        }
      }});
    }
  }
  
  cancel(event: Event) {
  event.stopPropagation();
  this.preview = null;
  this.previewList = [];
  this.image = null;
  this.imageBase64List = [];
}


  
}
  function getProductSubcategory() {
    throw new Error('Function not implemented.');
  }

