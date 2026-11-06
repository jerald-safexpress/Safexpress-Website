import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';

const THEME_DEFAULTS = {
  brandColor: '#2563eb',
  accentTextColor: '#2563eb',
  buttonBg: '#2563eb',
  buttonText: '#ffffff',
  buttonHover: '#1d4ed8',
  headingColor: '#0f172a',
  textColor: '#64748b',
  ghostButtonColor: '#ffffff',
  logoWordColor: '#0f172a',
  logoAccentColor: '#2563eb',
  logoWordOnDark: '#ffffff',
  logoLabelColor: '#1e3a8a',
  logoLabelOnDark: '#cbd5e1',
  heroKickerSize: 13,
  heroTitleSize: 72,
  heroTextSize: 18,
  heroStatValueSize: 44,
  heroStatLabelSize: 12,
  sectionLabelSize: 13
} as const;

@Component({
  selector: 'app-admin-theme',
  imports: [FormsModule],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Colors & theme</h1>
          <p>Customize colors and label font sizes. Changes preview live — click Save to keep them.</p>
        </div>
        <div class="admin-actions">
          <button class="admin-btn ghost" type="button" (click)="resetDefaults()">Reset defaults</button>
          <button class="admin-btn" type="button" (click)="save()">Save theme</button>
        </div>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <div class="admin-theme-preview">
        <div class="admin-theme-swatch" [style.background]="draft.ui.brandColor"><span>Brand</span></div>
        <div class="admin-theme-swatch" [style.background]="draft.ui.accentTextColor"><span>Accent text</span></div>
        <div class="admin-theme-swatch" [style.background]="draft.ui.buttonBg" [style.color]="draft.ui.buttonText"><span>Button</span></div>
        <div class="admin-theme-swatch light" [style.color]="draft.ui.headingColor"><span>Heading</span></div>
      </div>

      <div class="admin-theme-demo">
        <div class="admin-theme-logo-stack">
          <p class="admin-theme-logo" [style.color]="draft.ui.logoWordOnDark">
            Safexpress<em [style.color]="draft.ui.logoAccentColor"> Logistics</em>
          </p>
          <p class="admin-theme-logo-label" [style.color]="draft.ui.logoLabelOnDark">
            {{ draft.company.logoLabel || 'Your Supply Chain Enabler' }}
          </p>
        </div>
        <p class="admin-theme-kicker" [style.color]="draft.ui.brandColor">Worldwide Freight Solutions</p>
        <h2>
          <span [style.color]="'#ffffff'">Reliable Logistics</span>
          <span [style.color]="draft.ui.accentTextColor"> & Transport Services</span>
        </h2>
        <p [style.color]="'rgba(255,255,255,0.85)'">Hero-style sample — accent line and buttons follow your theme.</p>
        <div class="admin-actions">
          <button
            type="button"
            class="admin-btn"
            [style.background]="draft.ui.buttonBg"
            [style.color]="draft.ui.buttonText"
            [style.borderColor]="draft.ui.buttonBg"
          >Explore Services</button>
          <button
            type="button"
            class="admin-btn ghost"
            [style.color]="draft.ui.ghostButtonColor"
            [style.borderColor]="draft.ui.ghostButtonColor"
            [style.background]="'transparent'"
          >Track Shipment</button>
        </div>
      </div>

      <h2 class="admin-sub">Brand & accent</h2>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Brand / accent color</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.brandColor" name="brand" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.brandColor" name="brandHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Links, icons, stats numbers, section labels</small>
        </label>
        <label class="admin-field">
          <span>Hero accent text color</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.accentTextColor" name="accent" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.accentTextColor" name="accentHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">The colored line like “& Transport Services”</small>
        </label>
      </div>

      <h2 class="admin-sub">Buttons</h2>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Primary button background</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.buttonBg" name="btnBg" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.buttonBg" name="btnBgHex" (ngModelChange)="preview()" />
          </div>
        </label>
        <label class="admin-field">
          <span>Primary button text</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.buttonText" name="btnText" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.buttonText" name="btnTextHex" (ngModelChange)="preview()" />
          </div>
        </label>
        <label class="admin-field">
          <span>Primary button hover</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.buttonHover" name="btnHover" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.buttonHover" name="btnHoverHex" (ngModelChange)="preview()" />
          </div>
        </label>
        <label class="admin-field">
          <span>Ghost / outline button (hero)</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.ghostButtonColor" name="ghost" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.ghostButtonColor" name="ghostHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">“Track Shipment” border and text on the dark hero</small>
        </label>
      </div>

      <h2 class="admin-sub">Header company name</h2>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Logo word (light pages)</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.logoWordColor" name="logoWord" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.logoWordColor" name="logoWordHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Main name on white headers, e.g. “Safexpress”</small>
        </label>
        <label class="admin-field">
          <span>Logo accent letters</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.logoAccentColor" name="logoAccent" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.logoAccentColor" name="logoAccentHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Colored tail letters, e.g. “Logistics”</small>
        </label>
        <label class="admin-field">
          <span>Logo word on dark hero</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.logoWordOnDark" name="logoDark" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.logoWordOnDark" name="logoDarkHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Transparent home header over the hero image</small>
        </label>
        <label class="admin-field">
          <span>Logo label color</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.logoLabelColor" name="logoLabel" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.logoLabelColor" name="logoLabelHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Secondary line under the name (light pages)</small>
        </label>
        <label class="admin-field">
          <span>Logo label on dark hero</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.logoLabelOnDark" name="logoLabelDark" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.logoLabelOnDark" name="logoLabelDarkHex" (ngModelChange)="preview()" />
          </div>
          <small class="admin-hint">Secondary line on the transparent home header</small>
        </label>
      </div>

      <h2 class="admin-sub">Fonts / page text colors</h2>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Heading color</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.headingColor" name="heading" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.headingColor" name="headingHex" (ngModelChange)="preview()" />
          </div>
        </label>
        <label class="admin-field">
          <span>Body text color</span>
          <div class="admin-color-row">
            <input type="color" [(ngModel)]="draft.ui.textColor" name="text" (ngModelChange)="preview()" />
            <input [(ngModel)]="draft.ui.textColor" name="textHex" (ngModelChange)="preview()" />
          </div>
        </label>
      </div>

      <h2 class="admin-sub">Font sizes (labels & hero)</h2>
      <p class="admin-muted">Sizes are in pixels. Hero title scales down on small screens but never exceeds this value.</p>
      <div class="admin-grid-2">
        <label class="admin-field">
          <span>Hero kicker (e.g. Worldwide Freight Solutions)</span>
          <input type="number" min="10" max="28" [(ngModel)]="draft.ui.heroKickerSize" name="kickerSize" (ngModelChange)="preview()" />
        </label>
        <label class="admin-field">
          <span>Hero headline (Reliable Logistics…)</span>
          <input type="number" min="32" max="120" [(ngModel)]="draft.ui.heroTitleSize" name="titleSize" (ngModelChange)="preview()" />
        </label>
        <label class="admin-field">
          <span>Hero description text</span>
          <input type="number" min="12" max="28" [(ngModel)]="draft.ui.heroTextSize" name="heroTextSize" (ngModelChange)="preview()" />
        </label>
        <label class="admin-field">
          <span>Section labels (sitewide)</span>
          <input type="number" min="10" max="24" [(ngModel)]="draft.ui.sectionLabelSize" name="sectionLabelSize" (ngModelChange)="preview()" />
        </label>
        <label class="admin-field">
          <span>Hero stat numbers (15K+, 50+…)</span>
          <input type="number" min="20" max="80" [(ngModel)]="draft.ui.heroStatValueSize" name="statValueSize" (ngModelChange)="preview()" />
        </label>
        <label class="admin-field">
          <span>Hero stat labels (Delivered Shipments…)</span>
          <input type="number" min="9" max="20" [(ngModel)]="draft.ui.heroStatLabelSize" name="statLabelSize" (ngModelChange)="preview()" />
        </label>
      </div>

      <div class="admin-actions" style="margin-top: 8px">
        <button class="admin-btn ghost" type="button" (click)="matchBrand()">Match accent, logo & buttons to brand</button>
      </div>
    </div>
  `
})
export class AdminThemeComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';

  constructor() {
    this.ensureThemeDefaults();
    this.preview();
  }

  preview() {
    this.content.previewTheme(this.draft.ui);
  }

  save() {
    const next = structuredClone(this.content.snapshot());
    next.ui = { ...next.ui, ...this.draft.ui };
    this.content.save(next);
    this.message = 'Theme saved.';
  }

  matchBrand() {
    const brand = this.draft.ui.brandColor;
    this.draft.ui.accentTextColor = brand;
    this.draft.ui.buttonBg = brand;
    this.draft.ui.logoAccentColor = brand;
    this.preview();
  }

  resetDefaults() {
    Object.assign(this.draft.ui, THEME_DEFAULTS);
    this.preview();
    this.message = 'Theme reset to defaults (click Save colors to keep).';
  }

  private ensureThemeDefaults() {
    const ui = this.draft.ui as SiteContent['ui'] & Record<string, unknown>;
    for (const [key, value] of Object.entries(THEME_DEFAULTS)) {
      if (ui[key] == null || ui[key] === '') ui[key] = value;
    }
  }
}
