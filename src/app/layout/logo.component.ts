import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-logo',
  imports: [RouterLink],
  template: `
    <a
      class="logo"
      [class.tone-light]="tone === 'light'"
      [class.logo-full]="isFull"
      [class.has-label]="!isFull && !!label"
      routerLink="/"
      [attr.aria-label]="site().company.legalName"
    >
      @if (logoSrc) {
        <img class="logo-image" [src]="logoSrc" [alt]="site().company.legalName" />
      } @else {
        <svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true">
          <circle cx="20" cy="20" r="20" fill="var(--blue)"/>
          <ellipse cx="20" cy="20" rx="8" ry="15" fill="none" stroke="#fff" stroke-width="1.6"/>
          <path d="M5 20h30M7 13.5h26M7 26.5h26" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      }
      @if (!isFull) {
        <span class="logo-text">
          <span class="logo-word">{{ parts.word }}<em>{{ parts.accent }}</em></span>
          @if (label) {
            <span class="logo-label">{{ label }}</span>
          }
        </span>
      }
    </a>
  `
})
export class LogoComponent {
  @Input() tone: 'auto' | 'light' = 'auto';
  private content = inject(ContentService);
  site = this.content.content;

  get parts() {
    return this.content.brand();
  }

  get label() {
    return (this.site().company.logoLabel || '').trim();
  }

  /** Uploaded brand mark = image only (no HTML company name beside it). */
  get isFull() {
    return !!this.logoSrc;
  }

  get logoSrc() {
    const company = this.site().company;
    if (this.tone === 'light') {
      return company.logoLight || company.logo || '';
    }
    return company.logo || '';
  }
}
