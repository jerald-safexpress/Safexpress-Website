import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { AdminImageFieldComponent } from './admin-image-field.component';
import { readLogoAsDataUrl } from './admin-image.util';

@Component({
  selector: 'app-admin-company',
  imports: [FormsModule, AdminImageFieldComponent, RouterLink],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Company</h1>
          <p>Logo images, wordmark, contact details, and social links. Font and button colors live under <a routerLink="/admin/theme">Colors & theme</a>.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save company</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }
      @if (error) { <p class="admin-error">{{ error }}</p> }

      <h2 class="admin-sub">Browser tab</h2>
      <p class="admin-muted">Controls the text and icon in the browser tab (e.g. “Premium Global Logistics | SFX Logistics”).</p>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Home tab title</span>
          <input [(ngModel)]="draft.company.browserTitle" name="browserTitle" placeholder="Premium Global Logistics" />
          <small class="admin-hint">Shown before “| {{ draft.company.legalName || 'Company' }}”</small>
        </label>
        <div class="admin-box">
          <label class="admin-field">
            <span>Favicon / tab icon</span>
            <input [(ngModel)]="draft.company.favicon" name="favicon" placeholder="https://… or upload below" />
          </label>
          <div class="admin-logo-preview favicon">
            @if (draft.company.favicon) {
              <img [src]="draft.company.favicon" alt="Favicon preview" />
            } @else {
              <span>Using default favicon.ico</span>
            }
          </div>
          <div class="admin-actions">
            <label class="admin-btn ghost file">
              Upload favicon
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/x-icon,image/vnd.microsoft.icon,.ico,.svg" (change)="onFaviconFile($event)" hidden />
            </label>
            <button class="admin-btn ghost" type="button" (click)="draft.company.favicon = ''" [disabled]="!draft.company.favicon">Clear</button>
          </div>
        </div>
      </div>

      <h2 class="admin-sub">Logo</h2>
      <p class="admin-muted">Upload your brand mark (PNG with transparency preferred). Flat black backgrounds are removed automatically on upload. The header shows the image only. Add a light version for the dark hero header if needed.</p>
      <div class="admin-grid-2">
        <div class="admin-box">
          <label class="admin-field">
            <span>Main logo (light backgrounds)</span>
            <input [(ngModel)]="draft.company.logo" name="logo" placeholder="https://… or upload below" />
          </label>
          <div class="admin-logo-preview">
            @if (draft.company.logo) {
              <img [src]="draft.company.logo" alt="Main logo preview" />
            } @else {
              <span>Using built-in globe icon</span>
            }
          </div>
          <div class="admin-actions">
            <label class="admin-btn ghost file">
              Upload main logo
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg" (change)="onLogoFile($event, 'logo')" hidden />
            </label>
            <button class="admin-btn ghost" type="button" (click)="draft.company.logo = ''" [disabled]="!draft.company.logo">Clear</button>
          </div>
        </div>

        <div class="admin-box">
          <label class="admin-field">
            <span>Light logo (dark backgrounds)</span>
            <input [(ngModel)]="draft.company.logoLight" name="logoLight" placeholder="Optional white/light version" />
          </label>
          <div class="admin-logo-preview on-dark">
            @if (draft.company.logoLight || draft.company.logo) {
              <img [src]="draft.company.logoLight || draft.company.logo" alt="Light logo preview" />
            } @else {
              <span>Falls back to main logo / icon</span>
            }
          </div>
          <div class="admin-actions">
            <label class="admin-btn ghost file">
              Upload light logo
              <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,.svg" (change)="onLogoFile($event, 'logoLight')" hidden />
            </label>
            <button class="admin-btn ghost" type="button" (click)="draft.company.logoLight = ''" [disabled]="!draft.company.logoLight">Clear</button>
          </div>
        </div>

        <label class="admin-field"><span>Company short name (fallback if no logo image)</span><input [(ngModel)]="draft.company.name" name="name" /></label>
        <label class="admin-field"><span>Accent letters (count from end)</span><input type="number" min="0" [(ngModel)]="draft.company.accentLetters" name="accent" /></label>
        <label class="admin-field full">
          <span>Logo label (only when no logo image)</span>
          <input [(ngModel)]="draft.company.logoLabel" name="logoLabel" placeholder="e.g. LOGISTICS or Your Supply Chain Enabler" />
          <small class="admin-hint">Shown under the text name only if you clear the logo images.</small>
        </label>
        <p class="admin-hint" style="grid-column: 1 / -1; margin-top: -6px">Text name colors (fallback mode) are under <a routerLink="/admin/theme">Colors & theme</a>.</p>
      </div>

      <h2 class="admin-sub">Details</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Legal name</span><input [(ngModel)]="draft.company.legalName" name="legal" /></label>
        <label class="admin-field"><span>Tagline (top bar)</span><input [(ngModel)]="draft.company.tagline" name="tagline" /></label>
        <label class="admin-field"><span>Phone</span><input [(ngModel)]="draft.company.phone" name="phone" /></label>
        <label class="admin-field"><span>Email</span><input [(ngModel)]="draft.company.email" name="email" /></label>
        <label class="admin-field"><span>Address</span><input [(ngModel)]="draft.company.address" name="address" /></label>
        <label class="admin-field"><span>Hours</span><input [(ngModel)]="draft.company.hours" name="hours" /></label>
        <label class="admin-field"><span>Map latitude</span><input type="number" step="0.0001" [(ngModel)]="draft.company.lat" name="lat" /></label>
        <label class="admin-field"><span>Map longitude</span><input type="number" step="0.0001" [(ngModel)]="draft.company.lng" name="lng" /></label>
      </div>
      <app-admin-image-field label="Default page banner image" name="banner" [(value)]="draft.ui.banner" />

      <h2 class="admin-sub">Social links</h2>
      @for (social of draft.company.socials; track $index; let i = $index) {
        <div class="admin-row-3">
          <label class="admin-field"><span>Label</span><input [(ngModel)]="social.label" [name]="'sl' + i" /></label>
          <label class="admin-field"><span>Icon class</span><input [(ngModel)]="social.icon" [name]="'si' + i" /></label>
          <label class="admin-field"><span>URL</span><input [(ngModel)]="social.url" [name]="'su' + i" /></label>
        </div>
      }
      <button class="admin-btn ghost" type="button" (click)="addSocial()">Add social</button>
    </div>
  `
})
export class AdminCompanyComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';
  error = '';

  constructor() {
    this.draft.company.logo ??= '';
    this.draft.company.logoLight ??= '';
    this.draft.company.logoStyle ??= 'full';
    this.draft.company.logoLabel ??= '';
    this.draft.company.browserTitle ??= 'Premium Global Logistics';
    this.draft.company.favicon ??= '';
  }

  addSocial() {
    this.draft.company.socials.push({ label: 'New', icon: 'fa-brands fa-x-twitter', url: 'https://' });
  }

  async onLogoFile(event: Event, field: 'logo' | 'logoLight') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.error = '';
    try {
      this.draft.company[field] = await readLogoAsDataUrl(file);
      this.message = field === 'logo' ? 'Main logo loaded (black plate cleared). Click Save company.' : 'Light logo loaded. Click Save company.';
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Upload failed.';
    }
  }

  async onFaviconFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.error = '';
    try {
      this.draft.company.favicon = await readFaviconAsDataUrl(file);
      this.message = 'Favicon loaded. Click Save company.';
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Upload failed.';
    }
  }

  save() {
    this.error = '';
    const next = structuredClone(this.content.snapshot());
    next.company = structuredClone(this.draft.company);
    next.ui = { ...next.ui, banner: this.draft.ui.banner };
    this.content.save(next);
    this.message = 'Company details, tab title, and favicon saved.';
  }
}

function readFaviconAsDataUrl(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  const ok =
    file.type.startsWith('image/') ||
    name.endsWith('.ico') ||
    name.endsWith('.svg') ||
    name.endsWith('.png') ||
    name.endsWith('.webp') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg');
  if (!ok) {
    return Promise.reject(new Error('Choose a PNG, JPG, WebP, SVG, or ICO file.'));
  }
  if (file.size > 500_000) {
    return Promise.reject(new Error('Keep favicons under about 500 KB.'));
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.readAsDataURL(file);
  });
}
