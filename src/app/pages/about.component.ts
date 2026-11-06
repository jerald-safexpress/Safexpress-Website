import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink, PageBannerComponent],
  template: `
    <app-page-banner [title]="site().about.title" [image]="site().about.image" />
    <section class="section">
      <div class="container about-grid">
        <div class="prose">
          <span class="section-label">{{ site().company.legalName }}</span>
          <h2>{{ site().about.heading }}</h2>
          @for (paragraph of site().about.text; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          <ul class="check-list dark">
            @for (point of site().about.points; track point) {
              <li><i class="fa-solid fa-check"></i><span>{{ point }}</span></li>
            }
          </ul>
          <a class="btn btn-primary" routerLink="/quote">Get Quote</a>
        </div>
        <img [src]="site().about.image" [alt]="site().company.legalName" />
      </div>
      <div class="container">
        <div class="stats-row">
          @for (stat of site().hero.stats; track stat.label) {
            <div class="stat-box">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
