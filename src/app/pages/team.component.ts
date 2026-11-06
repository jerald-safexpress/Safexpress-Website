import { Component, inject } from '@angular/core';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-team',
  imports: [PageBannerComponent, SectionHeadComponent],
  template: `
    <app-page-banner title="Our Team" />
    <section class="section soft">
      <div class="container">
        <app-section-head label="People" [title]="site().teamIntro.title" [text]="site().teamIntro.text" />
        <div class="team-grid">
          @for (person of site().team; track person.name) {
            <article class="person">
              <img [src]="person.image" [alt]="person.name" />
              <div class="person-body">
                <h3>{{ person.name }}</h3>
                <div class="role">{{ person.role }}</div>
                <p>{{ person.text }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class TeamComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
