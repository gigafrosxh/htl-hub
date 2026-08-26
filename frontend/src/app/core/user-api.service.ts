import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserPayload {
  name: string;
  email: string;
  password?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api/user';

  createUser(payload: UserPayload): Observable<User> { return this.http.post<User>(this.baseUrl, payload); }
  login(payload: Pick<UserPayload, 'email' | 'password'>): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/api/auth/login', payload);
  }
  findUsers(): Observable<User[]> { return this.http.get<User[]>(this.baseUrl); }
  findUser(id: number): Observable<User> { return this.http.get<User>(`${this.baseUrl}/${id}`); }
  updateUser(id: number, payload: Partial<UserPayload>): Observable<User> { return this.http.patch<User>(`${this.baseUrl}/${id}`, payload); }
  deleteUser(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
}