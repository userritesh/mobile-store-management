import { Component, OnInit } from '@angular/core';
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
export class StockListComponent implements OnInit {
  activeTabId: SalesTab | null = null;
  tabs:any;   
  path!:string;
  searchValues: any;
  copyData: any;


  constructor(private location: Location, private router: Router,public popup:CommonPopupModelService,private apiastockcategory:CommonServiceTsService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      const lastSegment = currentUrl.split('/').pop();
      this.activeTabId = lastSegment as SalesTab;
      // if (this.activeTabId == SalesTab.Stock || this.activeTabId == SalesTab.Invoice) { this.onInit() }
      
      // ************** CHANGED (optimization) **************
      if ([SalesTab.Stock, SalesTab.Invoice].includes(this.activeTabId)) this.loadData();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  showflag: boolean = false
  bakflag: boolean = false
  loadData() {
  // this.showflag = false;
  // switch (this.activeTabId) {
  //   case SalesTab.Invoice:
  //     this.showflag = true;
  //     break;
  // }
    // ************** CHANGED (single expression control) **************
     this.apiastockcategory.getstockcategory().subscribe(list=>{
          this.tabs = list
          this.copyData =  structuredClone(this.tabs  )
          console.log(this.tabs);
          
        })
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

  addCard(){
  this.popup.openModalPopup(AddItemsPageComponent,null,'Add category Cad',ModalPopupSize.MD,"", false,true)
  .then(resultData=>{
    if(resultData){
      this.apiastockcategory.allstockcategory(resultData).subscribe(res=>{
       if(res.isSuccess){
        this.apiastockcategory.getstockcategory().subscribe(list=>{
          this.tabs = list
          console.log(this.tabs);
          
        })
       }
      });
    }
  })
}

  onSearch(searchText: string) {
    if (!searchText){
       this.tabs = this.copyData; 
       return;
    }
    this.searchValues = this.copyData.filter((items: any) => { return items.stockcategory.toLowerCase().includes(searchText.toLowerCase()) })
    this.searchValues ? this.tabs = this.searchValues : this.tabs = this.copyData
  }
  
 }
