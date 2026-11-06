import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { telHref } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  template: `
    <header class="site-header" [class.overlay]="isHome" [class.solid]="solid">
      <div class="container header-grid">
        <app-logo [tone]="solid ? 'auto' : 'light'" />
        <nav class="main-nav" aria-label="Primary">
          <ul class="nav-menu">
            @for (item of nav; track item.path) {
              <li class="has-child" [class.has-child]="item.children?.length">
                <a class="nav-link" [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.path === '/' }">
                  {{ item.label }}
                  @if (item.children?.length) { <i class="fa-solid fa-chevron-down"></i> }
                </a>
                @if (item.children?.length) {
                  <div class="dropdown">
                    @for (child of item.children; track child.path) {
                      <a [routerLink]="child.path">{{ child.label }}</a>
                    }
                  </div>
                }
              </li>
            }
          </ul>
        </nav>
        <div class="header-actions">
          <a class="btn btn-primary btn-sm" routerLink="/quote">Get Quote</a>
          <button class="burger" type="button" (click)="menuOpen = !menuOpen" [attr.aria-expanded]="menuOpen" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    @if (menuOpen) {
      <button class="backdrop" type="button" aria-label="Close menu" (click)="menuOpen = false"></button>
      <aside class="drawer">
        <div class="drawer-head">
          <app-logo />
          <button class="drawer-close" type="button" (click)="menuOpen = false" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav class="drawer-nav" aria-label="Mobile">
          @for (item of nav; track item.path) {
            <a [routerLink]="item.path" (click)="menuOpen = false">{{ item.label }}</a>
            @for (child of item.children || []; track child.path) {
              <a [routerLink]="child.path" (click)="menuOpen = false">{{ child.label }}</a>
            }
          }
          <a routerLink="/quote" (click)="menuOpen = false">Get Quote</a>
        </nav>
        <p>{{ site().footer.aboutText }}</p>
        <a class="block" [href]="phone"><i class="fa-solid fa-phone"></i><span>{{ site().company.phone }}</span></a>
        <a class="block" [href]="'mailto:' + site().company.email"><i class="fa-solid fa-envelope"></i><span>{{ site().company.email }}</span></a>
        <a class="block" routerLink="/contact" (click)="menuOpen = false"><i class="fa-solid fa-location-dot"></i><span>{{ site().company.address }}</span></a>
      </aside>
    }
  `
})
export class HeaderComponent {
  private content = inject(ContentService);
  site = this.content.content;
  menuOpen = false;
  isHome = true;
  private scrolled = false;
  private router = inject(Router);

  constructor() {
    this.sync();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
      this.sync();
    });
  }

  get phone() {
    return telHref(this.site().company.phone);
  }

  get nav() {
    const data = this.site();
    return data.nav.map((item) => {
      if (item.childrenFrom === 'services') {
        return {
          ...item,
          children: data.services.map((service) => ({ label: service.title, path: '/services/' + service.slug }))
        };
      }
      return item;
    });
  }

  get solid() {
    return this.menuOpen || !this.isHome || this.scrolled;
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 24;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.menuOpen = false;
  }

  private sync() {
    const path = this.router.url.split('?')[0].split('#')[0];
    this.isHome = path === '/' || path === '';
    this.scrolled = window.scrollY > 24;
  }
}
