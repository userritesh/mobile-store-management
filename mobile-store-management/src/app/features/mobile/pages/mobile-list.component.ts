import { Component, OnInit } from '@angular/core';
import { MobileService, MobileItem } from '../mobile.service';


@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
})
export class MobileListComponent implements OnInit {
  items: MobileItem[] = [];
  loading = false;
  error: string | null = null;

  constructor(private mobileService: MobileService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = null;
    this.mobileService.list().subscribe({
      next: (res) => {
        this.items = res || [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load';
        this.loading = false;
      }
    });
  }
}
