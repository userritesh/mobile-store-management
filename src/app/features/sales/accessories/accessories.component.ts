import { Component } from '@angular/core';

@Component({
  selector: 'app-accessories',
  templateUrl:'./accessories.component.html',
  styleUrls: ['./accessories.component.scss']
})
export class AccessoriesComponent {


assessoriess:any [] =[
  {
    product_name:"headphone",
    Price:"150",
    detailes:"wired headphone",
    src:"assets/img_icon/era_phone.jpg"
  },{
    product_name:"charger",
    Price:0,
    detailes:" type C charger and v8 charger",
    src:"/assets/img_icon/mobile-chargers.webp"
  }
  ,{
    product_name:"data cable",
    Price:0,
    detailes:"type C data cable and v8 data cable",
    src:"assets/img_icon/datacabel.png"
  }
  ,{
    product_name:"cover",
    Price:0,
    detailes:"All modal cover  search with modal",
    src:"assets/img_icon/covers.webp"
  },{
    product_name:"glass",
    Price:0,
    detailes:"All modal glass search with modal (Type 11D and D+)",
    src:"assets/img_icon/D_plusGlass.webp"
  },{
    product_name:"nack band",
    Price:0,
    detailes:"nack band",
    src:""
  }
]
}
