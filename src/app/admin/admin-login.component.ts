import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="admin-login">
      <form class="admin-login-card" (ngSubmit)="submit()">
        <h1>Sign in</h1>
        <p class="admin-muted">Edit company name, pages, services, and more. Changes save in this browser.</p>
        <label class="admin-field">
          <span>Password</span>
          <input type="password" name="password" [(ngModel)]="password" autocomplete="current-password" required />
        </label>
        @if (error) { <p class="admin-error">{{ error }}</p> }
        <button class="admin-btn" type="submit">Enter admin</button>
        <a routerLink="/">← Back to site</a>
      </form>
    </div>
  `
})
export class AdminLoginComponent {
  private auth = inject(AdminAuthService);
  private router = inject(Router);
  private content = inject(ContentService);
  password = '';
  error = '';

  constructor() {
    this.content.initTheme();
  }

  submit() {
    if (this.auth.login(this.password)) {
      this.router.navigateByUrl('/admin');
      return;
    }
    this.error = 'Wrong password.';
  }
}
