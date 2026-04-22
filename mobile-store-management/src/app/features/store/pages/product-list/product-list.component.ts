import { Component } from '@angular/core';
import { Product, PRODUCT_CATEGORIES, ProductCategory, ProductModal, ProductTypeEnum, Storagekey } from './product.model';
import { StorageService } from 'src/app/shared/storage.service';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  titalname!:string;
  allProductList: any[] = [];
  id!: string | null;
  constructor(public storageService: StorageService,private sellingService:CommonServiceTsService, private router:Router, private route: ActivatedRoute ) { }


  ngOnInit(): void {
    this.titalname = this.storageService.getItem(Storagekey.SelectedProductTitle, true,)
    const data = PRODUCT_CATEGORIES.find((cat) => cat.category === ProductTypeEnum.Accessories);
     this.id = this.route.snapshot.paramMap.get('id');
     this.getAllProductById(this.id);
    // this.getAllProductListdata();

  }

 getAllProductById(id:any) {
    this.sellingService.getAllProductsById(id).subscribe({
      next: (res) => {
        // if (res) {
        //   this.allProductList = res.filter((data: any) =>
        //     (data.productcategory?.toLowerCase() || '') === (this.titalname?.toLowerCase() || '')
        //   );

        //   console.log(this.productlist);
        // }
      }
    })
  }

  onSale(data:any){
    this.sellingService.setdata(data)
    this.router.navigate(['/stock/reports']);
  }

}
