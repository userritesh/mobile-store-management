import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles-edit',
  template: `
  <section class="p-3">
    <h4 *ngIf="!isNew">Edit Role</h4>
    <h4 *ngIf="isNew">New Role</h4>
    <form (ngSubmit)="save()">
      <div class="mb-2">
        <input class="form-control" [(ngModel)]="model.name" name="name" required placeholder="Role name" />
      </div>
      <div class="mb-2">
        <textarea class="form-control" [(ngModel)]="model.description" name="description" placeholder="Description"></textarea>
      </div>
      <div class="mb-2">
        <label>Permissions (comma-separated keys)</label>
        <input class="form-control" [(ngModel)]="permText" name="permText" />
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-outline-secondary" (click)="cancel()">Cancel</button>
      </div>
    </form>
  </section>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RolesEditComponent implements OnInit {
  model: any = {};
  permText = '';
  isNew = false;
  private route = inject(ActivatedRoute);
  private svc = inject(RolesService);
  private router = inject(Router);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = id === 'new' || !id;
    if (!this.isNew) {
      this.svc.getRole(id!).subscribe((r:any) => { this.model = r; this.permText = (r.permissions||[]).join(','); });
    }
  }

  save() {
    this.model.permissions = this.permText.split(',').map((s:string)=>s.trim()).filter(Boolean);
    this.svc.saveRole(this.model).subscribe(()=> this.router.navigate(['roles']));
  }

  cancel() { this.router.navigate(['roles']); }
}
