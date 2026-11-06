import { Injectable, signal } from '@angular/core';

const SESSION_KEY = 'sfx-admin-session';
const PASSWORD_KEY = 'sfx-admin-password';
const DEFAULT_PASSWORD = 'admin123';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  readonly loggedIn = signal(this.readSession());

  login(password: string): boolean {
    if (password !== this.currentPassword()) return false;
    sessionStorage.setItem(SESSION_KEY, '1');
    this.loggedIn.set(true);
    return true;
  }

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
    this.loggedIn.set(false);
  }

  changePassword(current: string, next: string): boolean {
    if (current !== this.currentPassword() || next.trim().length < 4) return false;
    localStorage.setItem(PASSWORD_KEY, next.trim());
    return true;
  }

  private currentPassword() {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  }

  private readSession() {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  }
}
