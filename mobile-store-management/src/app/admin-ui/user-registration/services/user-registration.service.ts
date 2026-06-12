import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {
  ClientRegistrationRequest,
  ClientRegistrationResponse,
  RegistrationPayload,
  RegistrationResult
} from '../models/registration.models';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  /** Django API — same host pattern as CommonServiceTsService */
  private readonly registerUrl = 'http://localhost:8000/api/auth/register/clients/';
  constructor(private http: HttpClient) { }

  submitRegistration(payload: RegistrationPayload): Observable<RegistrationResult> {
    const body = this.toApiRequest(payload);

    return this.http.post<ClientRegistrationResponse>(this.registerUrl, body).pipe(
      map((response) => this.toRegistrationResult(response)),
      catchError((error: HttpErrorResponse) =>
        throwError(() => new Error(this.extractErrorMessage(error)))
      )
    );
  }

  private toApiRequest(payload: RegistrationPayload): ClientRegistrationRequest {
    return {
      company_name: payload.company.companyName,
      company_email: payload.account.email,
      contact_person: payload.company.ownerName,
      password: payload.account.password,
      phone: payload.account.mobile || undefined
    };
  }

  private toRegistrationResult(response: ClientRegistrationResponse): RegistrationResult {
    const shortId = response.id.replace(/-/g, '').slice(0, 8).toUpperCase();
    return {
      registrationNumber: `REG-${shortId}`,
      registrationDate: response.created_at ?? new Date().toISOString(),
      status: response.status ?? 'Pending'
    };
  }

  private extractErrorMessage(error: HttpErrorResponse): string {
    const body = error.error;
    if (typeof body?.detail === 'string') {
      return body.detail;
    }

    if (Array.isArray(body?.detail)) {
      return body.detail
        .map((item: unknown) => String(item))
        .join(', ');
    }

    if (body && typeof body === 'object') {
      const messages = Object.entries(body).map(
        ([field, value]) => {
          if (Array.isArray(value)) {
            return `${field}: ${value.join(', ')}`;
          }

          return `${field}: ${String(value)}`;
        }
      );

      if (messages.length) {
        return messages.join(' | ');
      }
    }

    return error.message || 'Registration failed. Please try again.';
  }
}