import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { PermissionService } from '../permission/permission.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate, CanLoad {
  constructor(private perm: PermissionService, private auth: AuthService, private router: Router) {}

  private checkPermissions(required: any): boolean | UrlTree {
    if (!this.auth.getUser()) {
      return this.router.parseUrl('/login');
    }
    if (!required) return true;
    const { permissions, mode } = required as { permissions?: string[]; mode?: 'any' | 'all' };
    if (!permissions || permissions.length === 0) return true;
    const ok = mode === 'all' ? this.perm.hasAll(permissions) : this.perm.hasAny(permissions);
    return ok ? true : this.router.parseUrl('/access-denied');
  }

  canLoad(route: Route): boolean | UrlTree {
    return this.checkPermissions((route && (route.data as any)) || null);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.checkPermissions(route.data || null);
  }
}
