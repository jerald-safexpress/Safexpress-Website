import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceItem } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, PageBannerComponent],
  template: `
    @if (service) {
      <app-page-banner [title]="service.title" [image]="service.image" [parent]="{ label: 'Services', path: '/services' }" />
      <section class="section">
        <div class="container detail">
          <article class="prose">
            <img class="detail-img" [src]="service.image" [alt]="service.title" />
            <h2 style="margin-top: 28px">{{ service.lead }}</h2>
            @for (paragraph of service.paragraphs; track paragraph) {
              <p>{{ paragraph }}</p>
            }
            <ul class="check-list dark">
              @for (item of service.highlights; track item) {
                <li><i class="fa-solid fa-check"></i><span>{{ item }}</span></li>
              }
            </ul>
          </article>
          <aside class="side-card">
            <h3>Move this cargo with {{ site().company.name }}</h3>
            <p>Tell us the lane and the timing. We will reply with a rate for {{ service.title }}.</p>
            <a class="btn btn-primary" routerLink="/quote">Get Quote</a>
            <ul>
              @for (other of related; track other.slug) {
                <li><a [routerLink]="['/services', other.slug]">{{ other.title }}</a></li>
              }
            </ul>
          </aside>
        </div>
      </section>
    }
  `
})
export class ServiceDetailComponent implements OnInit {
  private content = inject(ContentService);
  site = this.content.content;
  service: ServiceItem | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.service = this.content.serviceBySlug(params.get('slug') || '');
      if (!this.service) {
        this.router.navigate(['/services']);
        return;
      }
      const title = `${this.service.title} | ${this.content.snapshot().company.legalName}`;
      setTimeout(() => this.title.setTitle(title));
    });
  }

  get related() {
    return this.content.snapshot().services.filter((item) => item.slug !== this.service?.slug).slice(0, 4);
  }
}
