import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-legal',
  imports: [PageBannerComponent],
  template: `
    <app-page-banner [title]="doc.title" />
    <section class="section">
      <div class="container prose" style="max-width: 860px">
        @for (paragraph of doc.paragraphs; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
    </section>
  `
})
export class LegalComponent implements OnInit {
  page: 'privacy' | 'terms' = 'privacy';
  private content = inject(ContentService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
      this.page = data['page'] === 'terms' ? 'terms' : 'privacy';
    });
  }

  get doc() {
    return this.content.snapshot().legal[this.page];
  }
}
