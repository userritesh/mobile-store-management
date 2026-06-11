import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  users: any[] = [];
  constructor(private mock: AdminMockService, private router: Router) {}
  ngOnInit(): void { this.users = this.mock.listUsers(); }
  view(u: any) { this.router.navigate(['/admin/users', u.id]); }
  edit(u: any) { this.router.navigate(['/admin/users', u.id, 'edit']); }
  delete(u: any) { if (confirm('Delete user?')) { this.mock.deleteUser(u.id); this.users = this.mock.listUsers(); } }
}
