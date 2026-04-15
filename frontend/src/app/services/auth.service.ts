import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginPayload, LoginResponse, RegisterPayload } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'clinica_token';
  private readonly emailKey = 'clinica_email';

  login(payload: LoginPayload): Observable<void> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, payload)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.emailKey, payload.email);
        }),
        map(() => void 0),
      );
  }

  registrar(payload: RegisterPayload): Observable<string> {
    return this.http.post(`${this.apiUrl}/auth/registrar`, payload, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        localStorage.setItem(this.emailKey, payload.email);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.emailKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getStoredEmail(): string | null {
    return localStorage.getItem(this.emailKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] ?? ''));
      const expiration = Number(payload.exp);
      if (!expiration) {
        return false;
      }

      return Date.now() >= expiration * 1000;
    } catch {
      return true;
    }
  }
}
