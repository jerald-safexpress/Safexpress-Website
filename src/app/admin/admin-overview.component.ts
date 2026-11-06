import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { InboxService } from '../inbox/inbox.service';

@Component({
  selector: 'app-admin-overview',
  imports: [RouterLink],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Overview</h1>
          <p>Edit any section from the sidebar. Saves stay in this browser until you reset or import elsewhere.</p>
        </div>
      </header>

      <div class="admin-cards">
        <article class="admin-card">
          <h2>Inbox</h2>
          <p>{{ inbox.messages().length }} messages · {{ inbox.unreadCount() }} unread</p>
          <a routerLink="/admin/inbox">Open messaging inbox</a>
        </article>
        <article class="admin-card">
          <h2>{{ site().company.legalName }}</h2>
          <p>{{ site().company.phone }} · {{ site().company.email }}</p>
          <a routerLink="/admin/company">Edit company & logo</a>
        </article>
        <article class="admin-card">
          <h2>Images / Media</h2>
          <p>Hero, services, team, fleet, blog, and more</p>
          <a routerLink="/admin/media">Upload or replace pictures</a>
        </article>
        <article class="admin-card">
          <h2>{{ site().services.length }} services</h2>
          <p>{{ site().team.length }} team · {{ site().posts.length }} posts · {{ site().faqs.length }} FAQs</p>
          <a routerLink="/admin/services">Edit services</a>
        </article>
        <article class="admin-card">
          <h2>Colors & theme</h2>
          <p>Brand {{ site().ui.brandColor }} · Button {{ site().ui.buttonBg }}</p>
          <a routerLink="/admin/theme">Edit fonts & button colors</a>
        </article>
        <article class="admin-card">
          <h2>{{ content.hasSavedOverrides() ? 'Custom content active' : 'Using defaults' }}</h2>
          <p>Export, import, or reset site content</p>
          <a routerLink="/admin/settings">Settings & backup</a>
        </article>
      </div>

      <div class="admin-note">
        <p><strong>Tip:</strong> Use <a routerLink="/admin/theme">Colors & theme</a> for font and button colors, and <a routerLink="/admin/media">Images / Media</a> for photos. After saving, open the public site in another tab to review.</p>
      </div>
    </div>
  `
})
export class AdminOverviewComponent {
  content = inject(ContentService);
  inbox = inject(InboxService);
  site = this.content.content;
}
