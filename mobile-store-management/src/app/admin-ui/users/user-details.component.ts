import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
  <div class="card">
    <div class="card-body">
      <h5>User Details</h5>
      <div *ngIf="user; else notfound">
        <dl class="row">
          <dt class="col-sm-3">ID</dt><dd class="col-sm-9">{{user.id}}</dd>
          <dt class="col-sm-3">Name</dt><dd class="col-sm-9">{{user.name}}</dd>
          <dt class="col-sm-3">Email</dt><dd class="col-sm-9">{{user.email}}</dd>
          <dt class="col-sm-3">Role</dt><dd class="col-sm-9">{{user.role}}</dd>
        </dl>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary" routerLink="/admin/users">Back</button>
          <button class="btn btn-primary" [routerLink]="['/admin/users', user.id, 'edit']">Edit</button>
        </div>
      </div>
      <ng-template #notfound><div class="text-muted">User not found</div></ng-template>
    </div>
  </div>
  `,
  styleUrls: ['./user-details.component.scss']
})
export class AdminUserDetailsComponent implements OnInit {
  user: any = null;
  constructor(private route: ActivatedRoute, private mock: AdminMockService) {}
  ngOnInit(): void { const id = Number(this.route.snapshot.paramMap.get('id')); this.user = this.mock.getUser(id); }
}
