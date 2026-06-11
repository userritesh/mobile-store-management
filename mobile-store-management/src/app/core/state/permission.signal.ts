import { computed } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';

const auth = inject(AuthService);
export const permissionSignal = computed(() => auth.getPermissions());
