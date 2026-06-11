import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RolesService {
  constructor(private http: HttpClient) {}

  list(): Observable<any> {
    return this.http.get('/api/rbac/permissions/');
  }

  getRoles(): Observable<any> {
    return this.http.get('/api/rbac/roles/');
  }

  getRole(id: string) {
    return this.http.get(`/api/rbac/roles/${id}/`);
  }

  saveRole(data: any) {
    if (data.id) return this.http.put(`/api/rbac/roles/${data.id}/`, data);
    return this.http.post('/api/rbac/roles/', data);
  }

  deleteRole(id: string) {
    return this.http.delete(`/api/rbac/roles/${id}/`);
  }
}
