import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
@Input()inputPlaceholder!:string;
@Input()inputName!:string;
@Input()inputId!:string;
@Input() requiredField: boolean = false;
@Input()inputType!:string;
@Input()label!:string;
@Input()inputvalue!:string
@Input()width!:string
@Output()inputvalueChange =new EventEmitter<string>();


}
