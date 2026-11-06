import { Component, inject } from '@angular/core';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-fleet',
  imports: [PageBannerComponent, SectionHeadComponent],
  template: `
    <app-page-banner title="Our Fleet" />
    <section class="section soft">
      <div class="container">
        <app-section-head label="Equipment" [title]="site().fleetIntro.title" [text]="site().fleetIntro.text" />
        <div class="fleet-grid">
          @for (item of site().fleet; track item.title) {
            <article class="fleet-card">
              <img [src]="item.image" [alt]="item.title" />
              <div class="fleet-body">
                <div class="meta">{{ item.meta }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class FleetComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
