import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/storage.service';
import { IndexedDbService } from '../../shared/indexeddb.service';

const AUTH_TOKEN_KEY = 'auth_token';

/**
 * AuthService manages authentication token handling for the client.
 *
 * Security guidance:
 * - Prefer HTTP-only secure cookies in production when possible.
 * - Session storage is the safer default in browser environments.
 * - IndexedDB is used for optional persistent token storage and reload recovery.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private storageService: StorageService,
    private indexedDbService: IndexedDbService
  ) {}

  /**
   * Save a bearer token.
   * If rememberMe is true, token is persisted to IndexedDB and localStorage.
   * Otherwise token is kept in sessionStorage only.
   */
  async saveToken(token: string, rememberMe = false): Promise<void> {
    this.storageService.setItem(AUTH_TOKEN_KEY, token, rememberMe);

    if (rememberMe) {
      await this.indexedDbService.setItem(AUTH_TOKEN_KEY, token);
    } else {
      await this.indexedDbService.removeItem(AUTH_TOKEN_KEY);
    }
  }

  /**
   * Returns the stored bearer token from sessionStorage or localStorage.
   */
  getToken(): string | null {
    const sessionToken = this.storageService.getItem<string>(AUTH_TOKEN_KEY, false);
    if (sessionToken) {
      return sessionToken;
    }
    return this.storageService.getItem<string>(AUTH_TOKEN_KEY, true);
  }

  /**
   * Load a persisted token from IndexedDB into session storage.
   * This is useful after a browser refresh when a remember-me token exists.
   */
  async loadTokenFromStorage(): Promise<void> {
    const existingToken = this.getToken();
    if (existingToken) {
      return;
    }

    const persistedToken = await this.indexedDbService.getItem<string>(AUTH_TOKEN_KEY);
    if (persistedToken) {
      this.storageService.setItem(AUTH_TOKEN_KEY, persistedToken, false);
    }
  }

  /**
   * Returns true when a token exists in storage.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Remove token from all storage backends.
   */
  async clearToken(): Promise<void> {
    this.storageService.removeItem(AUTH_TOKEN_KEY, false);
    this.storageService.removeItem(AUTH_TOKEN_KEY, true);
    await this.indexedDbService.removeItem(AUTH_TOKEN_KEY);
  }

  /**
   * Returns a header object that can be applied to HTTP requests.
   */
  getAuthorizationHeader(): { Authorization: string } | {} {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
