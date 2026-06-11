import { Injectable, computed, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private auth: AuthService) {}

  // expose reactive permissions
  perms = computed(() => this.auth.getPermissions());

  hasPermission(key: string): boolean {
    const perms = this.perms();
    if (!perms || perms.length === 0) return false;
    if (perms.includes(key)) return true;
    // wildcard match: e.g., product.* matches product.create
    const parts = key.split('.');
    for (const p of perms) {
      if (p.endsWith('.*')) {
        const prefix = p.slice(0, -2);
        if (key.startsWith(prefix + '.')) return true;
      }
    }
    return false;
  }

  hasAny(keys: string[]): boolean {
    return keys.some((k) => this.hasPermission(k));
  }

  hasAll(keys: string[]): boolean {
    return keys.every((k) => this.hasPermission(k));
  }
}
