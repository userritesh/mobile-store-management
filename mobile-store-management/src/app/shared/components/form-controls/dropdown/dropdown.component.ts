import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
 @Input() label?: string;
  @Input() placeholder: string = 'Select';
  @Input() items: any[] = [];
  @Input() bindLabel: string = 'name';
  @Input() bindValue: string = 'id';
  @Input() value: any = null;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<any>();

  // toggle search visibility
  searchable: boolean = false;

  onOpen() {
    this.searchable = true;
  }

  onClose() {
    this.searchable = false;
  }

  onChange(event: any) {
    this.valueChange.emit(this.value);
  }
}
