import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-avilabel-stock',
  templateUrl: './avilabel-stock.component.html',
  styleUrls: ['./avilabel-stock.component.scss']
})
export class AvilabelStockComponent implements OnInit {
  category: string | null = null;
  catId: any = null;
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private route: ActivatedRoute, private api: CommonServiceTsService, private location: Location) {}

  back() {
    this.location.back();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'] || null;
      this.catId = params['id'] || null;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.api.getAllProducts().subscribe((res: any[]) => {
      this.products = res || [];
      if (this.category) {
        const catLower = this.category.toString().toLowerCase();
        this.filteredProducts = this.products.filter(p => {
          const prodCat = (p.productcategory || p.stockcategory || p.product_category || '').toString().toLowerCase();
          return prodCat === catLower;
        });
      } else {
        this.filteredProducts = this.products;
      }
    });
  }
}
