import { Component } from '@angular/core';
import { Product, PRODUCT_CATEGORIES, ProductCategory, ProductModal, ProductTypeEnum, Storagekey } from './product.model';
import { StorageService } from 'src/app/shared/storage.service';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  productlist: Product[] = []
  localdataStore: ProductCategory[] = PRODUCT_CATEGORIES;

  etcdata: any;
  title: any;
  constructor(public storageService: StorageService,private sellingService:CommonServiceTsService, private router:Router ) { }
  ngOnInit(): void {
    var titalname = this.storageService.getItem(Storagekey.SelectedProductTitle, true,)
    const data = PRODUCT_CATEGORIES.find((cat) => cat.category === ProductTypeEnum.Accessories);
    if (data) {
      this.productlist = data.products.filter(p => (p.productName.toLowerCase() == titalname.toLowerCase()))
      console.log(this.productlist)
    }

  }
  onSale(data:any){
    this.sellingService.setdata(data)
    this.router.navigate(['/stock/reports']);
  }

}
