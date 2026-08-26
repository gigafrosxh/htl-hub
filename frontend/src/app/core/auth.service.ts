import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);

  saveSession(response: LoginResponse): void {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('current_user', JSON.stringify(response.user));
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token'));
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    void this.router.navigate(['/login']);
  }
}