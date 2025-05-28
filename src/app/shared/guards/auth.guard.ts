import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    await authService.login();
    return false;
  }

  return true;
}
