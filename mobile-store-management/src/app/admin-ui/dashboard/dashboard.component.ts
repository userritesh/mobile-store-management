import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {};
  recentUsers: any[] = [];
  recentSales: any[] = [];
  stockSummary: any[] = [];

  constructor(private mock: AdminMockService) {}

  ngOnInit(): void {
    this.stats = this.mock.getStats();
    this.recentUsers = this.mock.getRecentUsers();
    this.recentSales = this.mock.getRecentSales();
    this.stockSummary = this.mock.getStockSummary();
  }
}
