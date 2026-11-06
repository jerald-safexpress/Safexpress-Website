import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-page-banner',
  imports: [RouterLink],
  template: `
    <section class="page-banner">
      <img class="cover-media" [src]="image || site().ui.banner" alt="" />
      <div class="page-banner-overlay"></div>
      <div class="container">
        <h1>{{ title }}</h1>
        <p class="crumbs">
          <a routerLink="/">Home</a>
          @if (parent) {
            <span>/</span>
            <a [routerLink]="parent.path">{{ parent.label }}</a>
          }
          <span>/</span>
          {{ title }}
        </p>
      </div>
    </section>
  `
})
export class PageBannerComponent {
  @Input({ required: true }) title = '';
  @Input() image = '';
  @Input() parent: { label: string; path: string } | null = null;
  private content = inject(ContentService);
  site = this.content.content;
}
