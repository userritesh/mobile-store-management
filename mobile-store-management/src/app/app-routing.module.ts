import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './features/auth/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SalesComponent } from './features/sales/sales/sales.component';
import { PurchaseListComponent } from './features/stock/pages/purchase-list/purchase-list.component';
import { ProductComponent } from './features/sales/product/product.component';
import { LoginFormComponent } from './layout/login-form/login-form.component';
import { PermissionGuard } from './core/guards/permission.guard';

const routes: Routes = [
  // Admin standalone UI (mock-only)
  {
    path: 'admin',
    loadComponent: () => import('./admin-ui/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./admin-ui/auth/login.component').then(m => m.AdminLoginComponent) },
      { path: 'forgot-password', loadComponent: () => import('./admin-ui/auth/forgot-password.component').then(m => m.AdminForgotPasswordComponent) },
      { path: 'reset-password', loadComponent: () => import('./admin-ui/auth/reset-password.component').then(m => m.AdminResetPasswordComponent) },
      { path: 'dashboard', loadComponent: () => import('./admin-ui/dashboard/dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'users', loadComponent: () => import('./admin-ui/users/user-list.component').then(m => m.AdminUserListComponent) },
      { path: 'users/create', loadComponent: () => import('./admin-ui/users/user-create.component').then(m => m.AdminUserCreateComponent) },
      { path: 'users/:id/edit', loadComponent: () => import('./admin-ui/users/user-edit.component').then(m => m.AdminUserEditComponent) },
      { path: 'users/:id', loadComponent: () => import('./admin-ui/users/user-details.component').then(m => m.AdminUserDetailsComponent) },
      { path: 'registration', loadComponent: () => import('./admin-ui/user-registration/user-registration.component').then(m => m.UserRegistrationComponent) },
    ]
  },
  {
    path: '',
    component: HomeComponent,  
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule), data: { permissions: ['settings.general'] }, canLoad: [PermissionGuard] },
      { path: 'audit', loadChildren: () => import('./features/audit/audit.module').then(m => m.AuditModule), data: { permissions: ['audit.activity_logs'] }, canLoad: [PermissionGuard] },
      { path: 'mobile', loadChildren: () => import('./features/mobile/mobile.module').then(m => m.MobileModule), data: { permissions: ['mobile.list'] }, canLoad: [PermissionGuard] },
      { path: 'sales', loadChildren: () => import('./features/sales/sales.module').then(m => m.SalesModule) },
      { path: 'stock', loadChildren: () => import('./features/stock/stock.module').then(m => m.StockModule) },
      {path:'purchase',component:ProductComponent}
    ]
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'cart', loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule) },
  { path: 'checkout', loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: 'payments', loadChildren: () => import('./features/payments/payments.module').then(m => m.PaymentsModule) },
  { path: 'emi', loadChildren: () => import('./features/emi/emi.module').then(m => m.EmiModule) },
  { path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'repairs', loadChildren: () => import('./features/repairs/repairs.module').then(m => m.RepairsModule) },
  { path: 'recharges', loadChildren: () => import('./features/recharges/recharges.module').then(m => m.RechargesModule) },
  { path: 'stock', loadChildren: () => import('./features/stock/stock.module').then(m => m.StockModule) },
  { path: 'notifications', loadChildren: () => import('./features/notifications/notifications.module').then(m => m.NotificationsModule) },
  { path: 'users', loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule) },
  { path: 'login', component: LoginComponent },
  { path: 'roles', loadChildren: () => import('./features/roles/roles.module').then(m => m.RolesModule), data: { permissions: ['rbac.view'] }, canLoad: [PermissionGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
