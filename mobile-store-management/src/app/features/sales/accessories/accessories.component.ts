import { Component } from '@angular/core';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { filter } from 'rxjs';
import { CommonServiceTsService } from 'src/app/common.service.ts.service';
import { ModalPopupSize } from 'src/app/shared/common-enum/common-enum.module';
import { AddItemsPageComponent } from 'src/app/shared/components/add-items-page/add-items-page.component';
import { CommonPopupModelService } from 'src/app/shared/components/common-popup-model.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent {
  cardDetailes: any = {};
  copyData: any;
  searchValues: any;

  constructor(public popup: CommonPopupModelService, private productSubcategor: CommonServiceTsService) { }

  addCard() {
    const data = 'Product'
    this.popup.openModalPopup(AddItemsPageComponent, data, 'Add Product category', ModalPopupSize.MD, '', false, true).then(res => {
      this.productSubcategor.insertUpdateProductSubcategory(res).subscribe(res => {
        if (res) {
          this.productSubcategor.getProductSubcategory().subscribe(res => {
            if (res) {
              console.log(res)
            }
          })
        }
      })

    })
  }

  ngOnInit() {
    this.productSubcategor.getProductSubcategory().subscribe(res => {
      if (res) {
        this.cardDetailes = res;
        this.copyData = structuredClone(this.cardDetailes)
      }
    })
  }

  onSearch(searchText: string) {
    if (!searchText) {
      this.cardDetailes = this.copyData;
      return;
    }
    this.searchValues = this.copyData.filter((items: any) => {
      const value = searchText.replace(/[^a-zA-Z0-9]/g, '')
      const itemsValue = items.productcategory.replace(/[^a-zA-Z0-9]/g, '')
      return itemsValue.includes(value)
    })
    this.cardDetailes = this.searchValues.length ? this.searchValues : this.copyData
  }

}
