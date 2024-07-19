import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const skipInterceptor = req.headers.has('Skip-Interceptor');

  if (token && !skipInterceptor) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return next(clonedRequest);
  }

  const cleanedRequest = req.clone({
    headers: req.headers.delete('Skip-Interceptor'),
  });

  return next(cleanedRequest);
};
