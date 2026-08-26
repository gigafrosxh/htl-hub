import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'users' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'users', component: UsersComponent, canActivate: [authGuard] },
	{ path: '**', redirectTo: 'users' },
];
