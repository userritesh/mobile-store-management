import { Component } from '@angular/core';
import { InputComponent } from 'src/app/shared/components/form-controls/input/input.component';

@Component({
  selector: 'app-product',
  templateUrl:'./product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  todayDate = new Date();


  
  onSave(){
    
  }
  

}
