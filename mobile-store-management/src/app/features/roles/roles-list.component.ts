import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles-list',
  template: `
  <section class="p-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Roles</h4>
      <button class="btn btn-sm btn-primary" (click)="create()">New Role</button>
    </div>
    <table class="table table-sm">
      <thead><tr><th>Name</th><th>Description</th><th></th></tr></thead>
      <tbody>
        <tr *ngFor="let r of roles">
          <td>{{r.name}}</td>
          <td>{{r.description}}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-primary me-2" (click)="edit(r)">Edit</button>
            <button class="btn btn-sm btn-outline-danger" (click)="del(r)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  `,
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class RolesListComponent implements OnInit {
  roles: any[] = [];
  private svc = inject(RolesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.getRoles().subscribe((r:any) => this.roles = r);
  }

  create() { this.router.navigate(['roles','edit','new']); }
  edit(r:any) { this.router.navigate(['roles','edit', r.id]); }
  del(r:any) { if(confirm('Delete role?')) this.svc.deleteRole(r.id).subscribe(() => this.load()); }
}
