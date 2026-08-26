import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserApiService } from '../../core/user-api.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-register', imports: [FormsModule, RouterLink], templateUrl: './register.component.html' })
export class RegisterComponent {
  private readonly userApi = inject(UserApiService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly router = inject(Router);
  name = ''; email = ''; password = ''; isSubmitting = false; message = ''; error = '';

  submit(): void {
    this.isSubmitting = true; this.message = ''; this.error = '';
    this.userApi.createUser({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.message = 'Account erfolgreich erstellt.';
        this.name = '';
        this.email = '';
        this.password = '';
        this.isSubmitting = false;
        this.changeDetector.detectChanges();
        void this.router.navigate(['/login']);
      },
      error: (response) => {
        this.error = Array.isArray(response.error?.message)
          ? response.error.message.join(' ')
          : 'Registrierung fehlgeschlagen.';
        this.isSubmitting = false;
        this.changeDetector.detectChanges();
      },
    });
  }
}