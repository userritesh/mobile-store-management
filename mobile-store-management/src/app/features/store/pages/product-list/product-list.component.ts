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
  titalname!: string;
  allProductList: any[] = [];
  id!: string | null;
  slectedItems: any;
  items :any[] = [];
  constructor(public storageService: StorageService, private sellingService: CommonServiceTsService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.titalname = this.storageService.getItem(Storagekey.SelectedProductTitle, true,)
    const data = PRODUCT_CATEGORIES.find((cat) => cat.category === ProductTypeEnum.Accessories);
    this.id = this.route.snapshot.paramMap.get('id');
    this.getAllProductById(this.id);
  }

  getAllProductById(id: any) {
    this.sellingService.getAllProductsById(id).subscribe({
      next: (res) => {
        if (res) {
          this.allProductList = Array.isArray(res) ? res : [res];
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSale(data: any) {
    const productData = this.items.length >0 ? this.items : [data];
    this.sellingService.setdata(productData)
    this.router.navigate(['/stock/reports']);
  }
onAddtoCartselectcat(items:any){
   this.slectedItems = [...this.slectedItems,items]

   
  }
  addToCard(cardData:any){
    this.items.push(cardData)
  }
}
