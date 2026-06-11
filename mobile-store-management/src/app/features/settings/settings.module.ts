import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralSettingsComponent } from './pages/general-settings.component';
import { SecuritySettingsComponent } from './pages/security-settings.component';
import { SystemConfigComponent } from './pages/system-config.component';
import { PermissionGuard } from '../../core/guards/permission.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      { path: 'general', component: GeneralSettingsComponent, canActivate: [PermissionGuard], data: { permissions: ['settings.general'] } },
      { path: 'security', component: SecuritySettingsComponent, canActivate: [PermissionGuard], data: { permissions: ['settings.security'] } },
      { path: 'system', component: SystemConfigComponent, canActivate: [PermissionGuard], data: { permissions: ['settings.system'] } },
    ])
  ]
})
export class SettingsModule {}
