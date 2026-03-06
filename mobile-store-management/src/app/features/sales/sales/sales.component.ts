import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { SalesTab } from './sales_enum';
import { filter } from 'rxjs';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
import { CommonPopupModelService } from 'src/app/shared/components/common-popup-model.service';
import { AddItemsPageComponent } from 'src/app/shared/components/add-items-page/add-items-page.component';
import { ModalPopupSize } from 'src/app/shared/common-enum/common-enum.module';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

  activeTabId: SalesTab | null = null;
  selectedTab: any;
  tabs: any;

  constructor(private location: Location,private router: Router,private sellingService:CommonServiceTsService,public popupModule:CommonPopupModelService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      const lastSegment = currentUrl.split('/').pop(); 
      this.activeTabId = lastSegment as SalesTab;
    });
  }

// tabs = [
//   { label: 'Recharge',todaySale:"5000",icon:''},
//   { label: 'Phones', todaySale:"10000",icon:'assets/icons/cellphone.svg'},
//   { label: 'Accessory',todaySale:"3000",icon:'assets/img_icon/accessories.png'},
//   { label: 'Repairing',todaySale:"40000",icon:''}
// ];

  ngOnInit() {
    this.sellingService.getSellingItems().subscribe({
      next: (data) => {
        console.log('API response:', data);
        this.tabs = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  //  addCard() {
  //   const newCard = {
  //     label: 'Phone Sales',
  //     today_sale: 12345.67,
  //     icon: 'phone.png'
  //   };

  //   this.service.addDashboardCard(newCard).subscribe(
  //     (res) => {
  //       console.log('DashboardCard added:', res);
  //     },
  //     (err) => {
  //       console.error('Error adding DashboardCard:', err);
  //     }
  //   );
  // }
  
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

  addDetails() {
    this.popupModule?.openModalPopup(AddItemsPageComponent,null,'Add saling Catogary', ModalPopupSize.MD,"", false,true).then(
      (resultData) => {
        if (resultData) {
         
        }
      }
    );
  }

}
