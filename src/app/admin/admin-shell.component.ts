import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { ContentService } from '../content/content.service';
import { InboxService } from '../inbox/inbox.service';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-shell">
      <aside class="admin-side">
        <div class="admin-brand">
          <strong>{{ content.content().company.name }}</strong>
          <span>Content admin</span>
        </div>
        <nav>
          @for (item of links; track item.path) {
            <a [routerLink]="item.path" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: item.exact }">
              {{ item.label }}
              @if (item.path === '/admin/inbox' && unread()) {
                <span class="admin-nav-badge">{{ unread() }}</span>
              }
            </a>
          }
        </nav>
        <div class="admin-side-foot">
          <a routerLink="/" target="_blank">View site</a>
          <button type="button" (click)="logout()">Log out</button>
        </div>
      </aside>
      <section class="admin-main">
        <router-outlet />
      </section>
    </div>
  `
})
export class AdminShellComponent {
  content = inject(ContentService);
  private auth = inject(AdminAuthService);
  private router = inject(Router);
  private inbox = inject(InboxService);
  unread = this.inbox.unreadCount;

  links = [
    { label: 'Overview', path: '/admin', exact: true },
    { label: 'Inbox', path: '/admin/inbox', exact: false },
    { label: 'Company', path: '/admin/company', exact: false },
    { label: 'Colors & theme', path: '/admin/theme', exact: false },
    { label: 'Images / Media', path: '/admin/media', exact: false },
    { label: 'Home / Hero', path: '/admin/hero', exact: false },
    { label: 'Services', path: '/admin/services', exact: false },
    { label: 'Team & Fleet', path: '/admin/people', exact: false },
    { label: 'Blog & FAQ', path: '/admin/content', exact: false },
    { label: 'Tracking', path: '/admin/tracking', exact: false },
    { label: 'Contact & Footer', path: '/admin/contact', exact: false },
    { label: 'Settings', path: '/admin/settings', exact: false }
  ];

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/admin/login');
  }
}
