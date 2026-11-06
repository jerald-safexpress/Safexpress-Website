import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostItem } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-blog-detail',
  imports: [RouterLink, PageBannerComponent],
  template: `
    @if (post) {
      <app-page-banner [title]="post.title" [image]="post.image" [parent]="{ label: 'Blog', path: '/blog' }" />
      <section class="section">
        <div class="container prose" style="max-width: 860px">
          <p class="role">{{ post.date }}</p>
          <img class="detail-img" [src]="post.image" [alt]="post.title" />
          @for (paragraph of post.paragraphs; track paragraph) {
            <p>{{ paragraph }}</p>
          }
          <a class="btn btn-primary" routerLink="/blog">Back to Blog</a>
        </div>
      </section>
    }
  `
})
export class BlogDetailComponent implements OnInit {
  post: PostItem | null = null;
  private content = inject(ContentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.post = this.content.postBySlug(params.get('slug') || '');
      if (!this.post) {
        this.router.navigate(['/blog']);
        return;
      }
      const title = `${this.post.title} | ${this.content.snapshot().company.legalName}`;
      setTimeout(() => this.title.setTitle(title));
    });
  }
}
