export type RegistrationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Suspended';

export type PaymentMethod = 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking';

export type PlanId = 'basic' | 'standard' | 'premium';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  price: number;
  duration: string;
  userLimit: string;
  storageLimit: string;
  features: string[];
  recommended?: boolean;
}

export interface AccountDetails {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

export interface CompanyDetails {
  companyName: string;
  businessType: string;
  ownerName: string;
  gstNumber: string;
  panNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface PaymentDetails {
  paymentMethod: PaymentMethod;
  transactionId: string;
  amount: number;
}

export interface RegistrationPayload {
  account: AccountDetails;
  company: CompanyDetails;
  planId: PlanId;
  payment: PaymentDetails;
}

export interface RegistrationResult {
  registrationNumber: string;
  registrationDate: string;
  status: RegistrationStatus;
}

export const BUSINESS_TYPES = [
  'Retail Store',
  'Mobile Shop',
  'Electronics',
  'Wholesale',
  'Service Center',
  'Franchise',
  'Other'
] as const;

export const PAYMENT_METHODS: PaymentMethod[] = [
  'UPI',
  'Credit Card',
  'Debit Card',
  'Net Banking'
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 29,
    duration: '1 Month',
    userLimit: '5 Users',
    storageLimit: '10 GB',
    features: ['POS Billing', 'Inventory Tracking', 'Email Support', 'Basic Reports']
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: 59,
    duration: '1 Month',
    userLimit: '15 Users',
    storageLimit: '50 GB',
    recommended: true,
    features: ['Everything in Basic', 'Multi-store Support', 'GST Reports', 'Priority Support', 'API Access']
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 99,
    duration: '1 Month',
    userLimit: 'Unlimited Users',
    storageLimit: '200 GB',
    features: ['Everything in Standard', 'Advanced Analytics', 'Dedicated Manager', 'Custom Integrations', 'SLA Guarantee']
  }
];

export const REGISTRATION_STEPS = [
  { id: 0, label: 'Account', icon: 'bi-person-circle' },
  { id: 1, label: 'Company', icon: 'bi-building' },
  { id: 2, label: 'Plan', icon: 'bi-layers' },
  { id: 3, label: 'Payment', icon: 'bi-credit-card' },
  { id: 4, label: 'Review', icon: 'bi-check2-circle' }
] as const;
