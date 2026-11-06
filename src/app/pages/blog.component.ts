import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, PageBannerComponent, SectionHeadComponent],
  template: `
    <app-page-banner [title]="site().blogIntro.title" />
    <section class="section soft">
      <div class="container">
        <app-section-head [label]="site().blogIntro.label" [title]="site().blogIntro.title" [text]="site().blogIntro.text" />
        <div class="blog-grid">
          @for (post of site().posts; track post.slug) {
            <article class="blog-card">
              <div class="blog-image">
                <img [src]="post.image" [alt]="post.title" />
                <span class="blog-date">{{ post.date }}</span>
              </div>
              <div class="blog-content">
                <h3 class="blog-title"><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h3>
                <p>{{ post.excerpt }}</p>
                <a class="read-more" [routerLink]="['/blog', post.slug]">Read More <i class="fa-solid fa-arrow-right"></i></a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `
})
export class BlogComponent {
  private content = inject(ContentService);
  site = this.content.content;
}
