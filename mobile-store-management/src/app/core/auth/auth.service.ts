import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import type { TokenResponse, User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  // Signals hold runtime state in memory
  accessToken = signal<string | null>(null);
  user = signal<User | null>(null);
  permissions = signal<string[]>([]);

  // Initialize: attempt silent refresh to populate tokens/user
  async init() {
    try {
      await this.refresh();
    } catch (e) {
      this.clear();
    }
  }

  setAccessToken(token: string | null) {
    this.accessToken.set(token);
  }

  setUser(user: User | null) {
    this.user.set(user);
  }

  setPermissions(perms: string[]) {
    this.permissions.set(perms || []);
  }

  clear() {
    this.accessToken.set(null);
    this.user.set(null);
    this.permissions.set([]);
  }

  async login(email: string, password: string): Promise<TokenResponse> {
    const resp = await firstValueFrom(this.http.post<TokenResponse>('/api/auth/login', { email, password }));
    if (resp.accessToken) this.setAccessToken(resp.accessToken);
    if (resp.user) this.setUser(resp.user as User);
    if (resp.user && (resp.user as any).permissions) this.setPermissions((resp.user as any).permissions);
    return resp;
  }

  async refresh(): Promise<boolean> {
    // refresh token is expected to be stored in an HttpOnly cookie
    const resp = await firstValueFrom(this.http.post<TokenResponse>('/api/auth/refresh', {}));
    if (resp.accessToken) {
      this.setAccessToken(resp.accessToken);
      if (resp.user) this.setUser(resp.user as User);
      if ((resp.user as any)?.permissions) this.setPermissions((resp.user as any).permissions);
      return true;
    }
    this.clear();
    return false;
  }

  async logout(): Promise<void> {
    try {
      await firstValueFrom(this.http.post('/api/auth/logout', {}));
    } finally {
      this.clear();
    }
  }

  getAccessToken() {
    return this.accessToken();
  }

  getUser() {
    return this.user();
  }

  getPermissions() {
    return this.permissions();
  }
}
