import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { SalesTab } from 'src/app/features/sales/sales/sales_enum';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {
activeTabId: SalesTab | null = null;

  constructor(private location: Location,private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      const lastSegment = currentUrl.split('/').pop(); 
      this.activeTabId = lastSegment as SalesTab;
    });
  }

tabs = [
  { label: 'Recharge', path: 'recharge',img_path:"assets/img_icon/No_product_img.png"},
  { label: 'Phones', path: 'product',img_path:"assets/img_icon/Phones.webp"},
  { label: 'Accessories', path: 'accessories',img_path:"assets/img_icon/phone_accessories.jpg" }
];
showflag:boolean=false
bakflag:boolean=false
show(){
  
  this.showflag = !this.showflag
}
back(){
  //  switch (activeTabId) {
  //     case SalesTab.Sales:
  //      this.showflag = true;
  //       break;
  //     case SalesTab.Product:
  //       console.log('Product tab active');
  //       break;
  //     case SalesTab.Accessories:
  //        this.showflag = false;
  //       break;
  //     case SalesTab.ProductList:
  //       break;
  //     default:
  //       console.log('No tab active');
  //   }
  this.show()
  this.location.back();

}
}
