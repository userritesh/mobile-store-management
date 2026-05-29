import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../storage.service';
import { Storagekey } from 'src/app/features/store/pages/product-list/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(private router: Router, private storageService: StorageService) { }

  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() price?: number;
  @Input() image?: string;
  @Input() height?: string;
  @Input() route?: string;
  @Input() id?: any;
  @Input() specs?: any; // array|string
  @Input() payload?: any;

  @Output() action = new EventEmitter<any>();

  showDetails = false;

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  isArraySpec(): boolean {
    return Array.isArray(this.specs);
  }

  isStringSpec(): boolean {
    return typeof this.specs === 'string';
  }

  navigate() {
    if (this.route) {
      this.storageService.setItem(Storagekey.SelectedProductTitle, this.title, true);
      this.router.navigate([this.route, this.id]);
    }
  }

  emitAction() {
    this.action.emit(this.payload || { id: this.id });
  }
}

