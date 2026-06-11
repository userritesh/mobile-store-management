import { Injectable } from '@angular/core';
import { Observable, delay, of, throwError } from 'rxjs';
import { RegistrationPayload, RegistrationResult } from '../models/registration.models';

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  /**
   * Mock API — replace with HttpClient POST when backend is ready.
   */
  submitRegistration(payload: RegistrationPayload): Observable<RegistrationResult> {
    if (!payload.account?.email || !payload.planId) {
      return throwError(() => new Error('Invalid registration payload'));
    }

    const result: RegistrationResult = {
      registrationNumber: `REG-${Date.now().toString().slice(-8)}`,
      registrationDate: new Date().toISOString(),
      status: 'Pending'
    };

    return of(result).pipe(delay(1500));
  }
}
