import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SalesTab } from './sales_enum';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

  activeTabId: SalesTab | null = null;
  selectedTab: any;

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
  { label: 'Recharge',todaySale:"5000",icon:''},
  { label: 'Phones', todaySale:"10000",icon:'assets/icons/cellphone.svg'},
  { label: 'Accessories',todaySale:"3000",icon:'assets/img_icon/accessories.png'}
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
