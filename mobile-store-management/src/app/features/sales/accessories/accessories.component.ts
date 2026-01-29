import { Component } from '@angular/core';
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
        console.log(this.cardDetailes)
      }
    })
  }

}
