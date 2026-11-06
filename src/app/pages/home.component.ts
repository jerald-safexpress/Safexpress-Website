import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ContentService } from '../content/content.service';
import { SectionHeadComponent } from '../layout/section-head.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SectionHeadComponent],
  template: `
    <section class="hero">
      <div class="hero-bg" role="presentation" [style.backgroundImage]="heroBg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="kicker">{{ site().hero.kicker }}</div>
          <h1>{{ site().hero.title }}<span>{{ site().hero.titleAccent }}</span></h1>
          <p class="hero-text">{{ site().hero.text }}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" [routerLink]="site().hero.primary.path">{{ site().hero.primary.label }}</a>
            <a class="btn btn-ghost" [routerLink]="site().hero.secondary.path">{{ site().hero.secondary.label }}</a>
          </div>
          <div class="hero-stats">
            @for (stat of site().hero.stats; track stat.label) {
              <div class="hero-stat">
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="section tight white">
      <div class="container">
        <div class="features-grid">
          @for (feature of site().features; track feature.number) {
            <article class="feature-card">
              <div class="feature-icon"><i [class]="feature.icon"></i></div>
              <h2>{{ feature.title }}</h2>
              <p>{{ feature.text }}</p>
              <div class="feature-number">{{ feature.number }}</div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="track-band">
      <div class="track-panel">
        <i class="fa-solid fa-truck-fast track-watermark"></i>
        <h2>{{ site().trackingBand.title }}</h2>
        <p>{{ site().trackingBand.text }}</p>
        <form class="track-form" (submit)="track(box.value); $event.preventDefault()">
          <input #box name="trackingId" [placeholder]="site().trackingBand.placeholder" [attr.aria-label]="site().trackingBand.placeholder" />
          <button type="submit" aria-label="Track"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
      <div class="track-stats">
        <img class="cover-media" [src]="site().trackingBand.image" alt="" />
        @for (stat of site().trackingBand.stats; track stat.label) {
          <div class="stat-cell">
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        }
      </div>
    </section>

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

    <section class="why">
      <img class="cover-media" [src]="site().why.image" alt="" />
      <div class="why-overlay"></div>
      <div class="container">
        <div class="why-content">
          <span class="section-label">{{ site().why.label }}</span>
          <h2>{{ site().why.title }}</h2>
          <p>{{ site().why.text }}</p>
          <ul class="check-list">
            @for (point of site().why.points; track point) {
              <li><i class="fa-solid fa-check"></i><span>{{ point }}</span></li>
            }
          </ul>
          <a class="btn btn-primary" routerLink="/about">{{ site().why.button }}</a>
        </div>
      </div>
    </section>

    <section class="section white">
      <div class="container">
        <app-section-head [label]="site().processIntro.label" [title]="site().processIntro.title" [text]="site().processIntro.text" />
        <div class="process-grid">
          @for (step of site().process; track step.title) {
            <article class="process-step">
              <div class="process-icon"><i [class]="step.icon"></i></div>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section soft">
      <div class="container">
        <app-section-head [label]="site().testimonialsIntro.label" [title]="site().testimonialsIntro.title" />
        <div class="testi-grid">
          @for (item of visible; track item.id) {
            <article class="testimonial-card">
              <i class="fa-solid fa-quote-left quote-icon"></i>
              <p class="testimonial-text">"{{ item.quote }}"</p>
              <div class="testimonial-author">
                <img [src]="item.image" [alt]="item.name" />
                <div>
                  <div class="author-name">{{ item.name }}</div>
                  <div class="author-pos">{{ item.role }}</div>
                </div>
              </div>
            </article>
          }
        </div>
        <div class="dots">
          @for (item of site().testimonials; track item.id; let i = $index) {
            <button type="button" [class.on]="i === start" (click)="start = i" [attr.aria-label]="'Show testimonial ' + (i + 1)"></button>
          }
        </div>
      </div>
    </section>

    <section class="section white">
      <div class="container faq-grid">
        <app-section-head [label]="site().faqIntro.label" [title]="site().faqIntro.title" align="left" />
        <div>
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
      </div>
    </section>

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
export class HomeComponent {
  private content = inject(ContentService);
  site = this.content.content;
  open = 0;
  start = 0;
  private router = inject(Router);

  get heroBg() {
    return cssImage(this.site().hero.image);
  }

  get visible() {
    const items = this.site().testimonials;
    return [0, 1, 2].map((offset) => items[(this.start + offset) % items.length]);
  }

  track(id: string) {
    const value = id.trim();
    this.router.navigate(['/tracking'], { queryParams: value ? { id: value } : {} });
  }
}

function cssImage(src: string): string {
  if (!src) return 'none';
  return `url("${String(src).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")`;
}
