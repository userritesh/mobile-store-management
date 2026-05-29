/*
 * FILE: src/app/shared/indexeddb.service.ts
 * PURPOSE: IndexedDB helper for persistent client-side storage (used for
 *          storing 'remember me' auth tokens and other long-lived data).
 * NOTES: Use this service when you need async, larger, or persistent storage
 *        that survives browser restarts. See CHANGELOG.md for context.
 */
import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'mobile_store_mgmt_db';
const DB_VERSION = 1;
const STORE_NAME = 'auth_store';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME);
        }
      },
    });
  }

  async setItem(key: string, value: any): Promise<void> {
    const db = await this.dbPromise;
    await db.put(STORE_NAME, value, key);
  }

  async getItem<T = unknown>(key: string): Promise<T | null> {
    const db = await this.dbPromise;
    return (await db.get(STORE_NAME, key)) as T | null;
  }

  async removeItem(key: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete(STORE_NAME, key);
  }
}
