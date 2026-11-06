import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-careers',
  imports: [RouterLink, PageBannerComponent, SectionHeadComponent],
  template: `
    <app-page-banner title="Careers" />
    <section class="section soft">
      <div class="container" style="max-width: 980px">
        <app-section-head label="Join Us" [title]="site().careersIntro.title" [text]="site().careersIntro.text" />
        @for (job of site().jobs; track job.title) {
          <article class="job">
            <div>
              <h3>{{ job.title }}</h3>
              <div>
                <span class="chip">{{ job.location }}</span>
                <span class="chip">{{ job.type }}</span>
              </div>
              <p>{{ job.summary }}</p>
            </div>
            <a class="btn btn-primary" routerLink="/contact">Apply</a>
          </article>
        }
      </div>
    </section>
  `
})
export class CareersComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
