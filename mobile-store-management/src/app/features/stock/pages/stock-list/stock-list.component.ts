import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { SalesTab } from 'src/app/features/sales/sales/sales_enum';
import { CommonPopupModelService } from 'src/app/shared/components/common-popup-model.service';
import { AddItemsPageComponent } from 'src/app/shared/components/add-items-page/add-items-page.component';
import { ModalPopupSize } from 'src/app/shared/common-enum/common-enum.module';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent {
  activeTabId: SalesTab | null = null;

  constructor(private location: Location, private router: Router,public popup:CommonPopupModelService,private apiastockcategory:CommonServiceTsService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      const lastSegment = currentUrl.split('/').pop();
      this.activeTabId = lastSegment as SalesTab;
      // if (this.activeTabId == SalesTab.Stock || this.activeTabId == SalesTab.Invoice) { this.onInit() }
      
      // ************** CHANGED (optimization) **************
      if ([SalesTab.Stock, SalesTab.Invoice].includes(this.activeTabId)) this.onInit();
    });
  }

  tabs = [
    { label: 'Recharge', path: 'recharge', img_path: "assets/img_icon/No_product_img.png" },
    { label: 'Phones', path: 'product', img_path: "assets/img_icon/Phones.webp" },
    { label: 'Accessories', path: 'accessories', img_path: "assets/img_icon/phone_accessories.jpg" }
  ];
  showflag: boolean = false
  bakflag: boolean = false
 onInit() {
  // this.showflag = false;
  // switch (this.activeTabId) {
  //   case SalesTab.Invoice:
  //     this.showflag = true;
  //     break;
  // }
    // ************** CHANGED (single expression control) **************
   this.showflag = this.activeTabId === SalesTab.Invoice;
   
}

  show() {
    this.showflag = !this.showflag;
  }

  back() {
    switch (this.activeTabId) {
      case SalesTab.Accessories:
        this.showflag = false;
        break;
    }
    this.location.back();
  }

  // addCard(){
  //  this.popup.openModalPopup(AddItemsPageComponent,null,'Add category Cad',ModalPopupSize.MD,"", false,true).then(resultData=>{
  //   if(resultData){  
  //     this.apiastockcategory.allstockcategory((resultData))
      
  //   }
  //  })
    
  // }

  addCard(){
  this.popup.openModalPopup(AddItemsPageComponent,null,'Add category Cad',ModalPopupSize.MD,"", false,true)
  .then(resultData=>{
    if(resultData){
      this.apiastockcategory.allstockcategory(resultData).subscribe(res=>{
       if(res.isSuccess){
        this.apiastockcategory.getstockcategory().subscribe(list=>{
          console.log(list);
          
        })
       }
      });
    }
  })
}

  
  
 }


// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class LocalStorageService {

//   // Save data
//   setItem(key: string, data: any) {
//     localStorage.setItem(key, JSON.stringify(data));
//   }

//   // Get data
//   getItem(key: string): any {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : null;
//   }

//   // Remove data
//   removeItem(key: string) {
//     localStorage.removeItem(key);
//   }

//   // Clear all localStorage
//   clear() {
//     localStorage.clear();
//   }
// }
