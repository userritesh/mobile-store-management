import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  BUSINESS_TYPES,
  PAYMENT_METHODS,
  PlanId,
  REGISTRATION_STEPS,
  SUBSCRIPTION_PLANS,
  RegistrationResult
} from './models/registration.models';
import { UserRegistrationService } from './services/user-registration.service';
import {
  getPasswordStrength,
  gstValidator,
  panValidator,
  passwordMatchValidator,
  pincodeValidator,
  PasswordStrength
} from './validators/registration.validators';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnDestroy {
  readonly steps = REGISTRATION_STEPS;
  readonly plans = SUBSCRIPTION_PLANS;
  readonly businessTypes = BUSINESS_TYPES;
  readonly paymentMethods = PAYMENT_METHODS;

  currentStep = 0;
  isSubmitting = false;
  submitError = '';
  registrationResult: RegistrationResult | null = null;
  passwordStrength: PasswordStrength = getPasswordStrength('');
  showPassword = false;
  showConfirmPassword = false;

  private readonly destroy$ = new Subject<void>();

  registrationForm: FormGroup = this.fb.group({
    account: this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        email: ['', [Validators.required, Validators.email]],
        mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: passwordMatchValidator() }
    ),
    company: this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      businessType: ['', Validators.required],
      ownerName: ['', [Validators.required, Validators.minLength(2)]],
      gstNumber: ['', gstValidator()],
      panNumber: ['', panValidator()],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['India', Validators.required],
      pincode: ['', [Validators.required, pincodeValidator()]]
    }),
    subscription: this.fb.group({
      planId: ['' as PlanId | '', Validators.required]
    }),
    payment: this.fb.group({
      paymentMethod: ['', Validators.required],
      transactionId: ['', [Validators.required, Validators.minLength(6)]],
      amount: [{ value: 0, disabled: true }, [Validators.required, Validators.min(1)]]
    }),
    review: this.fb.group({
      termsAccepted: [false, Validators.requiredTrue],
      privacyAccepted: [false, Validators.requiredTrue]
    })
  });

  constructor(
    private fb: FormBuilder,
    private registrationService: UserRegistrationService
  ) {
    this.registrationForm
      .get('account.password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.passwordStrength = getPasswordStrength(value || '');
      });

    this.registrationForm
      .get('subscription.planId')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((planId) => this.syncPaymentAmount(planId as PlanId));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isSuccessStep(): boolean {
    return this.registrationResult !== null;
  }

  get selectedPlan() {
    const planId = this.registrationForm.get('subscription.planId')?.value as PlanId;
    return this.plans.find((p) => p.id === planId) ?? null;
  }

  get stepFormGroups(): FormGroup[] {
    return [
      this.registrationForm.get('account') as FormGroup,
      this.registrationForm.get('company') as FormGroup,
      this.registrationForm.get('subscription') as FormGroup,
      this.registrationForm.get('payment') as FormGroup,
      this.registrationForm.get('review') as FormGroup
    ];
  }

  get currentStepGroup(): FormGroup {
    return this.stepFormGroups[this.currentStep];
  }

  isStepComplete(index: number): boolean {
    return index < this.currentStep || (this.isSuccessStep && index <= this.steps.length - 1);
  }

  isStepActive(index: number): boolean {
    return !this.isSuccessStep && this.currentStep === index;
  }

  selectPlan(planId: PlanId): void {
    this.registrationForm.get('subscription')?.patchValue({ planId });
    this.registrationForm.get('subscription.planId')?.markAsTouched();
  }

  nextStep(): void {
    const group = this.currentStepGroup;
    group.markAllAsTouched();

    if (group.invalid) {
      return;
    }

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.submitError = '';
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.submitError = '';
    }
  }

  goToStep(index: number): void {
    if (this.isSuccessStep || index >= this.currentStep) {
      return;
    }
    this.currentStep = index;
  }

  submitRegistration(): void {
    this.registrationForm.markAllAsTouched();
    this.submitError = '';

    const invalidIndex = this.stepFormGroups.findIndex((g) => g.invalid);
    if (invalidIndex !== -1) {
      this.currentStep = invalidIndex;
      return;
    }

    const raw = this.registrationForm.getRawValue();
    this.isSubmitting = true;

    this.registrationService
      .submitRegistration({
        account: raw.account,
        company: raw.company,
        planId: raw.subscription.planId,
        payment: {
          ...raw.payment,
          amount: this.selectedPlan?.price ?? raw.payment.amount
        }
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          this.registrationResult = result;
          this.isSubmitting = false;
        },
        error: (err: Error) => {
          this.submitError = err.message || 'Registration failed. Please try again.';
          this.isSubmitting = false;
        }
      });
  }

  startNewRegistration(): void {
    this.registrationResult = null;
    this.currentStep = 0;
    this.submitError = '';
    this.passwordStrength = getPasswordStrength('');
    this.registrationForm.reset({
      account: { username: '', email: '', mobile: '', password: '', confirmPassword: '' },
      company: { country: 'India' },
      subscription: { planId: '' },
      payment: { paymentMethod: '', transactionId: '', amount: 0 },
      review: { termsAccepted: false, privacyAccepted: false }
    });
  }

  isInvalid(groupName: string, controlName: string): boolean {
    const control = this.registrationForm.get(`${groupName}.${controlName}`);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasGroupError(groupName: string, errorKey: string): boolean {
    const group = this.registrationForm.get(groupName);
    return !!(group && group.hasError(errorKey) && (group.dirty || group.touched));
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  private syncPaymentAmount(planId: PlanId | ''): void {
    const plan = this.plans.find((p) => p.id === planId);
    const amountControl = this.registrationForm.get('payment.amount');
    if (plan && amountControl) {
      amountControl.setValue(plan.price);
    }
  }
}
