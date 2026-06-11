import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '../../menu/menu.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, HasPermissionDirective],
  template: `
    <nav class="sidebar">
      <div class="brand">Mobile Mgmt</div>
      <ul>
        <li *ngFor="let item of menu">
          <a *hasPermission="item.permission" [routerLink]="[item.route || '#']">
            <span class="icon">{{item.icon}}</span>
            <span class="title">{{item.title}}</span>
          </a>
          <ul *ngIf="item.children?.length">
            <li *ngFor="let c of item.children">
              <a *hasPermission="c.permission" [routerLink]="[c.route || '#']">{{c.title}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .sidebar{width:240px;padding:16px;background:#fff}
    .brand{font-weight:700;margin-bottom:12px}
    ul{list-style:none;padding:0}
    a{display:flex;gap:8px;align-items:center;text-decoration:none;padding:6px 8px;border-radius:4px}
  `]
})
export class SidebarComponent {
  menu = this.menuService.getMenu().map((item: any) => ({
    ...item,
    route: item.route ?? '#',
    children: (item.children || []).map((c: any) => ({ ...c, route: c.route ?? '#' }))
  }));
  constructor(private menuService: MenuService) {}
}
