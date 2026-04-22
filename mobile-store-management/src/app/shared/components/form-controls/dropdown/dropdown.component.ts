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
  @Input() width?: string;
  @Input() value: any = null;
  @Input() disabled: boolean = false;
  @Input() searchable: boolean = false;
  @Input() clearable: boolean = true;

  @Output() valueChange = new EventEmitter<any>();
  @Output() open = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onOpen() {
    this.open.emit();
  }

  onClose() {
    this.close.emit();
  }

  onChange(event: any) {
    this.valueChange.emit(event);
  }
}
