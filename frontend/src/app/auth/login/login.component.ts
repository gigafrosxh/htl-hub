import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserApiService } from '../../core/user-api.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly userApi = inject(UserApiService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  email = '';
  password = '';
  isSubmitting = false;
  error = '';

  submit(): void {
    this.isSubmitting = true;
    this.error = '';
    this.userApi.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.authService.saveSession(response);
        this.isSubmitting = false;
        void this.router.navigate(['/users']);
      },
      error: () => {
        this.error = 'Ungültige E-Mail oder Passwort.';
        this.isSubmitting = false;
      },
    });
  }
}