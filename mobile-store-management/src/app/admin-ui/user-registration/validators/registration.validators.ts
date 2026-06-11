import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(passwordKey = 'password', confirmKey = 'confirmPassword'): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirm = group.get(confirmKey)?.value;

    if (!password || !confirm) {
      return null;
    }

    return password === confirm ? null : { passwordMismatch: true };
  };
}

export function gstValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').trim().toUpperCase();
    if (!value) {
      return null;
    }
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstPattern.test(value) ? null : { invalidGst: true };
  };
}

export function panValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').trim().toUpperCase();
    if (!value) {
      return null;
    }
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(value) ? null : { invalidPan: true };
  };
}

export function pincodeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = (control.value || '').trim();
    if (!value) {
      return null;
    }
    return /^[0-9]{6}$/.test(value) ? null : { invalidPincode: true };
  };
}

export interface PasswordStrength {
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
  percent: number;
  color: string;
}

export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'Weak', percent: 0, color: '#dc3545' };
  }

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return { score, label: 'Weak', percent: 25, color: '#dc3545' };
  }
  if (score <= 4) {
    return { score, label: 'Fair', percent: 50, color: '#fd7e14' };
  }
  if (score <= 5) {
    return { score, label: 'Good', percent: 75, color: '#0d6efd' };
  }
  return { score, label: 'Strong', percent: 100, color: '#198754' };
}
