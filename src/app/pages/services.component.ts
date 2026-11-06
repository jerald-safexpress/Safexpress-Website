import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-services',
  imports: [RouterLink, PageBannerComponent, SectionHeadComponent],
  template: `
    <app-page-banner [title]="site().servicesIntro.title" />
    <section class="section soft">
      <div class="container">
        <app-section-head [label]="site().servicesIntro.label" [title]="site().servicesIntro.title" [text]="site().servicesIntro.text" />
        <div class="services-grid">
          @for (service of site().services; track service.slug) {
            <article class="service-card">
              <div class="service-image">
                <img [src]="service.image" [alt]="service.title" />
                <div class="service-icon"><i [class]="service.icon"></i></div>
              </div>
              <div class="service-content">
                <h3 class="service-title">{{ service.title }}</h3>
                <p>{{ service.summary }}</p>
                <a class="service-link" [routerLink]="['/services', service.slug]">Learn More <i class="fa-solid fa-arrow-right"></i></a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class ServicesComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
