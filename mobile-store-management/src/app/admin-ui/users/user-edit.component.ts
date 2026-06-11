import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
  <div class="card">
    <div class="card-body">
      <h5>Edit User</h5>
      <form (ngSubmit)="save()" [formGroup]="form">
        <div class="mb-3"><label class="form-label">Name</label><input class="form-control" formControlName="name"></div>
        <div class="mb-3"><label class="form-label">Email</label><input class="form-control" formControlName="email"></div>
        <div class="mb-3"><label class="form-label">Role</label>
          <select class="form-select" formControlName="role"><option value="admin">Admin</option><option value="manager">Manager</option><option value="staff">Staff</option></select>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btn btn-secondary me-2" routerLink="/admin/users">Cancel</button>
          <button class="btn btn-primary" [disabled]="form.invalid">Save</button>
        </div>
      </form>
    </div>
  </div>
  `,
  styleUrls: ['./user-edit.component.scss']
})
export class AdminUserEditComponent implements OnInit {
  form = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], role: ['staff'] });
  id: number | null = null;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private mock: AdminMockService, private router: Router) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.id = id;
    const u = this.mock.getUser(id);
    if (u) { this.form.patchValue(u); }
  }
  save() { if (this.form.valid && this.id) { this.mock.updateUser(this.id, this.form.value); this.router.navigate(['/admin/users']); } }
}
