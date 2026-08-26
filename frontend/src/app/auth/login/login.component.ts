import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserApiService } from '../../core/user-api.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly userApi = inject(UserApiService);
  email = '';
  password = '';
  isSubmitting = false;
  error = '';

  submit(): void {
    this.isSubmitting = true;
    this.error = '';
    this.userApi.login({ email: this.email, password: this.password }).subscribe({
      next: ({ access_token }) => {
        localStorage.setItem('access_token', access_token);
        this.isSubmitting = false;
      },
      error: () => {
        this.error = 'Ungültige E-Mail oder Passwort.';
        this.isSubmitting = false;
      },
    });
  }
}