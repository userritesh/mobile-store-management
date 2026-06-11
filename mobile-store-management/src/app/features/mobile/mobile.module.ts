import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MobileListComponent } from './pages/mobile-list.component';
import { MobileAddComponent } from './pages/mobile-add.component';
import { MobileEditComponent } from './pages/mobile-edit.component';
import { MobileDetailComponent } from './pages/mobile-detail.component';
import { PermissionGuard } from '../../core/guards/permission.guard';

@NgModule({
  declarations: [MobileListComponent, MobileAddComponent, MobileEditComponent, MobileDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: MobileListComponent, canActivate: [PermissionGuard], data: { permissions: ['mobile.list'] } },
      { path: 'add', component: MobileAddComponent, canActivate: [PermissionGuard], data: { permissions: ['mobile.add'] } },
      { path: 'edit/:id', component: MobileEditComponent, canActivate: [PermissionGuard], data: { permissions: ['mobile.edit'] } },
      { path: 'detail/:id', component: MobileDetailComponent, canActivate: [PermissionGuard], data: { permissions: ['mobile.view'] } },
    ])
  ]
})
export class MobileModule {}
