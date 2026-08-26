import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = localStorage.getItem('access_token');
  const authService = inject(AuthService);
  const router = inject(Router);

  const request$ = token
    ? next(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
    : next(request);

  return request$.pipe(
    catchError((error) => {
      if (error.status === 401 && !request.url.endsWith('/auth/login')) {
        authService.clearSession();
        void router.navigate(['/login']);
      }
      return throwError(() => error);
    }),
  );
};