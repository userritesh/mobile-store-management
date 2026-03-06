import { NgClass } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @ViewChild('myButton') myButton!: ElementRef;
  @Input() buttonClass!:string;
  @Input() buttonType!:string;
  @Input() ngClass: string | string[] | { [klass: string]: any } = '';
  @Input() disabled :boolean=false;
  @Input() buttonId!:string;
  @Input() tag!:string;
  @Output () buttonOutputEvent: EventEmitter<any> = new EventEmitter();

   handleClick() {
     this.buttonOutputEvent.emit();
  }

}
