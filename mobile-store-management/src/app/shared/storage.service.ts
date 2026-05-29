import { Injectable } from '@angular/core';

/**
 * StorageService provides a safe wrapper for sessionStorage and localStorage.
 * It also supports an in-memory fallback for environments where browser storage is unavailable.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private memoryStore = new Map<string, any>();

  private get isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  private getStorage(useLocalStorage: boolean): Storage | undefined {
    if (!this.isBrowser) {
      return undefined;
    }
    return useLocalStorage ? window.localStorage : window.sessionStorage;
  }

  setItem(key: string, value: any, useLocalStorage: boolean = false): void {
    const storage = this.getStorage(useLocalStorage);

    if (!storage) {
      // Fallback for server-side rendering or unsupported browsers.
      this.memoryStore.set(key, value);
      return;
    }

    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('StorageService.setItem error', error);
    }
  }

  getItem<T = unknown>(key: string, useLocalStorage: boolean = false): T | null {
    const storage = this.getStorage(useLocalStorage);

    if (!storage) {
      return this.memoryStore.get(key) ?? null;
    }

    try {
      const rawValue = storage.getItem(key);
      return rawValue ? (JSON.parse(rawValue) as T) : null;
    } catch (error) {
      console.error('StorageService.getItem error', error);
      return null;
    }
  }

  removeItem(key: string, useLocalStorage: boolean = false): void {
    const storage = this.getStorage(useLocalStorage);

    if (!storage) {
      this.memoryStore.delete(key);
      return;
    }

    try {
      storage.removeItem(key);
    } catch (error) {
      console.error('StorageService.removeItem error', error);
    }
  }

  clear(useLocalStorage: boolean = false): void {
    const storage = this.getStorage(useLocalStorage);

    if (!storage) {
      this.memoryStore.clear();
      return;
    }

    try {
      storage.clear();
    } catch (error) {
      console.error('StorageService.clear error', error);
    }
  }
}
