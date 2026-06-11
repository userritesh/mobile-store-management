import { inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authSignal = (() => {
  const auth = inject(AuthService);
  const user = signal(auth.getUser());
  // subscribe/update pattern could be extended — this is a lightweight wrapper
  return { user };
})();
