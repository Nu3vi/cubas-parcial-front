import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
 const authService = inject(AuthService);

  // No añadir token a assets
  if (req.url.includes('/assets/')) {
    return next(req);
  }

  const token = authService.getToken();

  if (token && authService.isAuthenticated()) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
