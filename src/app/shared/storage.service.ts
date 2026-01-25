import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  private memoryStore = new Map<string, any>();

  setItem(key: string, value: any, useLocalStorage: boolean = false): void {
    if (useLocalStorage) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('localStorage set error', e);
      }
    } else {
      this.memoryStore.set(key, value);
    }
  }

  getItem(key: string, useLocalStorage: boolean = false): any {
    if (useLocalStorage) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    }
  }

  removeItem(key: string, useLocalStorage: boolean = false): void {
    if (useLocalStorage) {
      localStorage.removeItem(key);
    } else {
      this.memoryStore.delete(key);
    }
  }

  clear(useLocalStorage: boolean = false): void {
    if (useLocalStorage) {
      localStorage.clear();
    } else {
      this.memoryStore.clear();
    }
  }

}
