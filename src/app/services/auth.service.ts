import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}
 
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
  
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        tap(response => this.storeToken(response.token))
      );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true;
  
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return true;
  
    return decodedToken.exp < Date.now() / 1000;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, { username, email, password });
  }

  getUserNameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;
  
    const decodedToken = this.decodeToken(token);
    if (!decodedToken) return null;
  
    return decodedToken.username;
  }
}
