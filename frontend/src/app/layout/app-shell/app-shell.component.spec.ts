import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { logout: () => undefined } },
      ],
    }).compileComponents();
  });

  it('renders the module navigation', () => {
    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('nav[aria-label="Hauptnavigation"]')).toBeTruthy();
    expect(element.textContent).toContain('Dashboard');
    expect(element.textContent).toContain('Wayfinder');
    expect(element.textContent).toContain('Developer-Tools');
    expect(element.textContent).toContain('Einstellungen');
  });

  it('opens and closes the mobile navigation', () => {
    const fixture = TestBed.createComponent(AppShellComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const openButton = element.querySelector<HTMLButtonElement>(
      'button[aria-label="Navigation öffnen"]',
    );

    expect(openButton).toBeTruthy();
    expect(openButton?.getAttribute('aria-expanded')).toBe('false');
    openButton?.click();
    fixture.detectChanges();
    expect(openButton?.getAttribute('aria-expanded')).toBe('true');

    element.querySelector<HTMLButtonElement>('button[aria-label="Navigation schließen"]')?.click();
    fixture.detectChanges();
    expect(openButton?.getAttribute('aria-expanded')).toBe('false');
  });
});
