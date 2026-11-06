import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, PageBannerComponent],
  template: `
    <app-page-banner [title]="site().notFound.title" />
    <section class="section">
      <div class="container prose" style="max-width: 720px">
        <p>{{ site().notFound.text }}</p>
        <a class="btn btn-primary" routerLink="/">{{ site().notFound.button }}</a>
      </div>
    </section>
  `
})
export class NotFoundComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
