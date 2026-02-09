import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id?: number;
  email: string;
  name?: string;
  token?: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  // Get current user value
  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Get user from localStorage (only in browser)
  private getUserFromStorage(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Login with email and password - optimized for instant response
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.success && response.user) {
            const user = response.user;
            // Update subject first for instant UI response
            this.currentUserSubject.next(user);

            // Store in localStorage synchronously to avoid auth-token races
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              if (user.token) {
                localStorage.setItem('authToken', user.token);
              }
            }
          }
          return response;
        })
      );
  }



  // Register new user
  register(email: string, password: string, name: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, { email, password, name })
      .pipe(
        map(response => {
          if (response.success && response.user) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('currentUser', JSON.stringify(response.user));
              if (response.user.token) {
                localStorage.setItem('authToken', response.user.token);
              }
            }
            this.currentUserSubject.next(response.user);
          }
          return response;
        })
      );
  }

  // Logout
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
    }
    this.currentUserSubject.next(null);
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Get auth token
  getToken(): string | null {
    // Prefer in-memory token to avoid timing issues right after login
    const current = this.currentUser;
    if (current?.token) {
      return current.token;
    }
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }
}
