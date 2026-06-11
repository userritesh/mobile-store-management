import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminMockService } from '../services/admin-mock.service';

@Component({
  selector: 'app-admin-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class AdminUserCreateComponent {
  form = this.fb.group({ name: ['', Validators.required], email: ['', [Validators.required, Validators.email]], role: ['staff'] });
  constructor(private fb: FormBuilder, private mock: AdminMockService, private router: Router) {}
  save() { if (this.form.valid) { this.mock.createUser(this.form.value); this.router.navigate(['/admin/users']); } }
}
