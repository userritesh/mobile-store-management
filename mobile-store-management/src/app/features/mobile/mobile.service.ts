import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MobileItem {
  id: number | string;
  name: string;
  model?: string;
}

@Injectable({ providedIn: 'root' })
export class MobileService {
  constructor(private http: HttpClient) {}

  list(): Observable<MobileItem[]> {
    return this.http.get<MobileItem[]>('/api/mobile/');
  }

  get(id: string | number) {
    return this.http.get<MobileItem>(`/api/mobile/${id}/`);
  }

  create(payload: Partial<MobileItem>) {
    return this.http.post<MobileItem>('/api/mobile/', payload);
  }

  update(id: string | number, payload: Partial<MobileItem>) {
    return this.http.put<MobileItem>(`/api/mobile/${id}/`, payload);
  }

  delete(id: string | number) {
    return this.http.delete(`/api/mobile/${id}/`);
  }
}
