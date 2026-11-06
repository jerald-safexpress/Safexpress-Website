import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { ContentService } from './content/content.service';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { LogoComponent } from './layout/logo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LogoComponent],
  template: `
    @if (visible) {
      <div class="preloader" [class.done]="hiding">
        <div class="preloader-box">
          <app-logo tone="light" />
          <span class="preloader-line"><i></i></span>
        </div>
      </div>
    }
    @if (!isAdmin()) {
      <app-header />
    }
    <main>
      <router-outlet />
    </main>
    @if (!isAdmin()) {
      <app-footer />
    }
  `
})
export class AppComponent implements OnInit {
  private content = inject(ContentService);
  private router = inject(Router);
  private title = inject(Title);
  visible = false;
  hiding = false;
  isAdmin = signal(false);

  constructor() {
    this.content.initTheme();
    this.syncAdmin();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.syncAdmin();
      if (this.isAdmin()) {
        this.visible = false;
        this.hiding = true;
      }
      let current = this.router.routerState.root;
      while (current.firstChild) current = current.firstChild;
      const company = this.content.snapshot().company;
      const path = this.router.url.split('?')[0].split('#')[0];
      const isHome = path === '/' || path === '';
      const brand = (company.browserTitle || company.legalName || company.name || 'SFX').trim();
      if (isHome) {
        // Home tab: one clean title — no "Name | Name" duplication
        this.title.setTitle(brand);
        return;
      }
      const page = (current.snapshot.data['title'] as string | undefined)?.trim();
      if (!page || page.toLowerCase() === brand.toLowerCase()) {
        this.title.setTitle(brand);
      } else {
        this.title.setTitle(`${page} | ${brand}`);
      }
    });
  }

  ngOnInit() {
    this.syncAdmin();
    const ui = this.content.snapshot().ui;
    this.visible = ui.showPreloader && !this.isAdmin();
    if (!this.visible) return;
    const wait = ui.preloaderMs;
    setTimeout(() => (this.hiding = true), wait);
    setTimeout(() => (this.visible = false), wait + 480);
  }

  private syncAdmin() {
    const path = this.router.url || (typeof location !== 'undefined' ? location.pathname : '');
    this.isAdmin.set(path.startsWith('/admin') || path.includes('/admin'));
  }
}
