import { Component, inject } from '@angular/core';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { AdminImageFieldComponent } from './admin-image-field.component';

@Component({
  selector: 'app-admin-media',
  imports: [AdminImageFieldComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Images / Media</h1>
          <p>Upload or replace every picture on the site from one place. Changes apply after you save.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save all images</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <h2 class="admin-sub">Home page</h2>
      <div class="admin-media-grid">
        <app-admin-image-field label="Hero background" name="hero" [(value)]="draft.hero.image" />
        <app-admin-image-field label="Why choose us background" name="why" [(value)]="draft.why.image" />
        <app-admin-image-field label="Tracking band photo" name="track" [(value)]="draft.trackingBand.image" />
        <app-admin-image-field label="Inner page banner" name="banner" [(value)]="draft.ui.banner" />
      </div>

      <h2 class="admin-sub">Services</h2>
      <div class="admin-media-grid">
        @for (service of draft.services; track service.slug; let i = $index) {
          <app-admin-image-field [label]="service.title || 'Service ' + (i + 1)" [name]="'svc' + i" [(value)]="service.image" />
        }
      </div>

      <h2 class="admin-sub">Team photos</h2>
      <div class="admin-media-grid">
        @for (person of draft.team; track person.name; let i = $index) {
          <app-admin-image-field [label]="person.name || 'Team ' + (i + 1)" [name]="'team' + i" [(value)]="person.image" />
        }
      </div>

      <h2 class="admin-sub">Fleet</h2>
      <div class="admin-media-grid">
        @for (item of draft.fleet; track item.title; let i = $index) {
          <app-admin-image-field [label]="item.title || 'Fleet ' + (i + 1)" [name]="'fleet' + i" [(value)]="item.image" />
        }
      </div>

      <h2 class="admin-sub">Blog posts</h2>
      <div class="admin-media-grid">
        @for (post of draft.posts; track post.slug; let i = $index) {
          <app-admin-image-field [label]="post.title || 'Post ' + (i + 1)" [name]="'post' + i" [(value)]="post.image" />
        }
      </div>

      <h2 class="admin-sub">Testimonials</h2>
      <div class="admin-media-grid">
        @for (item of draft.testimonials; track item.id; let i = $index) {
          <app-admin-image-field [label]="item.name || 'Customer ' + (i + 1)" [name]="'testi' + i" [(value)]="item.image" [compact]="true" />
        }
      </div>

      <h2 class="admin-sub">About page</h2>
      <div class="admin-media-grid">
        <app-admin-image-field label="About image" name="about" [(value)]="draft.about.image" />
      </div>

      <div class="admin-note">
        <p><strong>Tip:</strong> Logos are under <em>Company</em>. Large photos are compressed automatically when you upload. Prefer JPG/WebP for photos and PNG/SVG for logos.</p>
      </div>
    </div>
  `
})
export class AdminMediaComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';

  save() {
    this.content.save(this.draft);
    this.message = 'All images saved. Open the public site to review.';
  }
}
