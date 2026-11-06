import { Component, inject } from '@angular/core';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-faq-page',
  imports: [PageBannerComponent],
  template: `
    <app-page-banner title="FAQ" />
    <section class="section">
      <div class="container" style="max-width: 860px">
        @for (item of site().faqs; track item.question; let i = $index) {
          <div class="faq-item">
            <button type="button" (click)="open = open === i ? -1 : i" [attr.aria-expanded]="open === i">
              <span>{{ item.question }}</span>
              <i class="fa-solid" [class.fa-minus]="open === i" [class.fa-plus]="open !== i"></i>
            </button>
            @if (open === i) { <p class="answer">{{ item.answer }}</p> }
          </div>
        }
      </div>
    </section>
  `
})
export class FaqPageComponent {
  private content = inject(ContentService);
  site = this.content.content;
  open = 0;
}
