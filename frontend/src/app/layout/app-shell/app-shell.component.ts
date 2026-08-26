import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { navigationGroups } from '../../core/navigation';

@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.css',
})
export class AppShellComponent {
  readonly authService = inject(AuthService);
  readonly navigationGroups = navigationGroups;
  readonly navigationOpen = signal(false);

  toggleNavigation(): void {
    this.navigationOpen.update((open) => !open);
  }

  closeNavigation(): void {
    this.navigationOpen.set(false);
  }

  logout(): void {
    this.closeNavigation();
    this.authService.logout();
  }
}
