import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityLogsComponent } from './pages/activity-logs.component';
import { LoginHistoryComponent } from './pages/login-history.component';
import { UserActivityComponent } from './pages/user-activity.component';
import { PermissionGuard } from '../../core/guards/permission.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'activity', pathMatch: 'full' },
      { path: 'activity', component: ActivityLogsComponent, canActivate: [PermissionGuard], data: { permissions: ['audit.activity_logs'] } },
      { path: 'login-history', component: LoginHistoryComponent, canActivate: [PermissionGuard], data: { permissions: ['audit.login_history'] } },
      { path: 'user-activity', component: UserActivityComponent, canActivate: [PermissionGuard], data: { permissions: ['audit.user_activity'] } },
    ])
  ]
})
export class AuditModule {}
