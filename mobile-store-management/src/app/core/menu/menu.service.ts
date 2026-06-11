import { Injectable } from '@angular/core';
import { PermissionService } from '../permission/permission.service';

export interface MenuItem {
  id: string;
  title: string;
  route?: string;
  icon?: string;
  permission?: string; // permission key required to show
  children?: MenuItem[];
}

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private perm: PermissionService) {}

  private _menu: MenuItem[] = [
    { id: 'dashboard', title: 'Dashboard', route: '/dashboard', icon: 'dashboard', permission: 'dashboard.view' },
    { id: 'products', title: 'Products', route: '/products', icon: 'inventory', permission: 'product.view' },
    { id: 'orders', title: 'Orders', route: '/orders', icon: 'receipt', permission: 'order.view' },
    {
      id: 'inventory', title: 'Inventory', icon: 'store', permission: 'inventory.view', children: [
        { id: 'stock', title: 'Stock', route: '/inventory/stock', permission: 'stock.view' }
      ]
    }
    ,
    {
      id: 'settings', title: 'Settings', icon: 'settings', permission: 'settings.general', children: [
        { id: 'settings.general', title: 'General Settings', route: '/settings/general', permission: 'settings.general' },
        { id: 'settings.security', title: 'Security Settings', route: '/settings/security', permission: 'settings.security' },
        { id: 'settings.system', title: 'System Configuration', route: '/settings/system', permission: 'settings.system' },
      ]
    },
    {
      id: 'audit', title: 'Audit', icon: 'report', permission: 'audit.activity_logs', children: [
        { id: 'audit.activity', title: 'Activity Logs', route: '/audit/activity', permission: 'audit.activity_logs' },
        { id: 'audit.login', title: 'Login History', route: '/audit/login-history', permission: 'audit.login_history' },
        { id: 'audit.useractivity', title: 'User Activity', route: '/audit/user-activity', permission: 'audit.user_activity' },
      ]
    },
    {
      id: 'mobile_mgmt', title: 'Mobile Management', icon: 'smartphone', permission: 'mobile.list', children: [
        { id: 'mobile.list', title: 'Mobile List', route: '/mobile/list', permission: 'mobile.list' },
        { id: 'mobile.add', title: 'Add Mobile', route: '/mobile/add', permission: 'mobile.add' },
        { id: 'mobile.edit', title: 'Edit Mobile', route: '/mobile/edit', permission: 'mobile.edit' },
        { id: 'mobile.detail', title: 'Mobile Details', route: '/mobile/:id', permission: 'mobile.view' },
      ]
    }
  ];

  getMenu() {
    return this.filterMenu(this._menu);
  }

  private filterMenu(items: MenuItem[]): MenuItem[] {
    const out: MenuItem[] = [];
    for (const it of items) {
      if (it.permission && !this.perm.hasPermission(it.permission)) continue;
      const copy: MenuItem = { ...it };
      if (copy.children) copy.children = this.filterMenu(copy.children);
      out.push(copy);
    }
    return out;
  }
}
