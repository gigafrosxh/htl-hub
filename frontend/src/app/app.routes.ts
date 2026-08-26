import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './core/auth.guard';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { PlannedFeatureComponent } from './shared/planned-feature/planned-feature.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Anmelden | HTL Hub' },
  { path: 'register', component: RegisterComponent, title: 'Registrieren | HTL Hub' },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: PlannedFeatureComponent,
        title: 'Dashboard | HTL Hub',
        data: {
          title: 'Dashboard',
          description: 'Dein Überblick über Unterricht, Aufgaben und Termine.',
          phase: 2,
        },
      },
      {
        path: 'timetable',
        component: PlannedFeatureComponent,
        title: 'Stundenplan | HTL Hub',
        data: {
          title: 'Stundenplan',
          description: 'Tages- und Wochenansicht für deinen Schulalltag.',
          phase: 2,
        },
      },
      {
        path: 'tasks',
        component: PlannedFeatureComponent,
        title: 'Aufgaben | HTL Hub',
        data: {
          title: 'Aufgaben',
          description: 'Abgaben und offene Aufgaben an einem Ort.',
          phase: 2,
        },
      },
      {
        path: 'exams',
        component: PlannedFeatureComponent,
        title: 'Prüfungen | HTL Hub',
        data: {
          title: 'Prüfungen',
          description: 'Tests, Schularbeiten und Lernfortschritt planen.',
          phase: 2,
        },
      },
      {
        path: 'calendar',
        component: PlannedFeatureComponent,
        title: 'Kalender | HTL Hub',
        data: {
          title: 'Kalender',
          description: 'Schulische und private Termine koordinieren.',
          phase: 2,
        },
      },
      {
        path: 'attendance',
        component: PlannedFeatureComponent,
        title: 'Anwesenheit | HTL Hub',
        data: {
          title: 'Anwesenheit',
          description: 'Fehlstunden und Verspätungen im Blick behalten.',
          phase: 2,
        },
      },
      {
        path: 'wayfinder',
        component: PlannedFeatureComponent,
        title: 'Wayfinder | HTL Hub',
        data: {
          title: 'Wayfinder',
          description: 'Räume finden und dich durch die Schule navigieren.',
          phase: 3,
        },
      },
      {
        path: 'notes',
        component: PlannedFeatureComponent,
        title: 'Notizen | HTL Hub',
        data: {
          title: 'Notizen',
          description: 'Lernunterlagen strukturiert festhalten.',
          phase: 4,
        },
      },
      {
        path: 'flashcards',
        component: PlannedFeatureComponent,
        title: 'Karteikarten | HTL Hub',
        data: {
          title: 'Karteikarten',
          description: 'Eigene Kartensets erstellen und wiederholen.',
          phase: 4,
        },
      },
      {
        path: 'grades',
        component: PlannedFeatureComponent,
        title: 'Noten | HTL Hub',
        data: {
          title: 'Noten',
          description: 'Leistungen erfassen und Durchschnitte berechnen.',
          phase: 4,
        },
      },
      {
        path: 'pomodoro',
        component: PlannedFeatureComponent,
        title: 'Pomodoro | HTL Hub',
        data: {
          title: 'Pomodoro',
          description: 'Fokussierte Lernblöcke und Pausen timen.',
          phase: 4,
        },
      },
      {
        path: 'calculators',
        component: PlannedFeatureComponent,
        title: 'Rechner | HTL Hub',
        data: {
          title: 'Rechner',
          description: 'Mathematische und technische Berechnungen durchführen.',
          phase: 5,
        },
      },
      {
        path: 'network-tools',
        component: PlannedFeatureComponent,
        title: 'Netzwerk-Tools | HTL Hub',
        data: {
          title: 'Netzwerk-Tools',
          description: 'Subnetze, CIDR und Netzwerkadressen berechnen.',
          phase: 5,
        },
      },
      {
        path: 'developer-tools',
        component: PlannedFeatureComponent,
        title: 'Developer-Tools | HTL Hub',
        data: {
          title: 'Developer-Tools',
          description: 'JSON, Base64, Hashes und Regex direkt bearbeiten.',
          phase: 5,
        },
      },
      {
        path: 'projects',
        component: PlannedFeatureComponent,
        title: 'Projekte | HTL Hub',
        data: {
          title: 'Projekte',
          description: 'Schul- und Softwareprojekte übersichtlich verwalten.',
          phase: 6,
        },
      },
      {
        path: 'snippets',
        component: PlannedFeatureComponent,
        title: 'Code-Snippets | HTL Hub',
        data: {
          title: 'Code-Snippets',
          description: 'Nützlichen Code speichern und schnell wiederfinden.',
          phase: 6,
        },
      },
      {
        path: 'files',
        component: PlannedFeatureComponent,
        title: 'Dateien | HTL Hub',
        data: {
          title: 'Dateien',
          description: 'Schulmaterialien nach Fach und Thema organisieren.',
          phase: 6,
        },
      },
      {
        path: 'links',
        component: PlannedFeatureComponent,
        title: 'Links | HTL Hub',
        data: {
          title: 'Links',
          description: 'Wichtige Schul- und Entwicklerlinks sammeln.',
          phase: 6,
        },
      },
      { path: 'users', component: UsersComponent, title: 'Benutzer | HTL Hub' },
      {
        path: 'settings',
        component: PlannedFeatureComponent,
        title: 'Einstellungen | HTL Hub',
        data: {
          title: 'Einstellungen',
          description: 'Profil und persönliche Hub-Einstellungen verwalten.',
          phase: 1,
        },
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '' },
];
