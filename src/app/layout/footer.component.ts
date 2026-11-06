import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { telHref } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { LogoComponent } from './logo.component';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, LogoComponent],
  template: `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <app-logo tone="light" />
          <h3 style="margin-top: 22px">{{ site().footer.aboutTitle }}</h3>
          <p class="footer-about">{{ site().footer.aboutText }}</p>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul>
            @for (link of site().footer.links; track link.path) {
              <li><a [routerLink]="link.path">{{ link.label }}</a></li>
            }
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            @for (service of site().services; track service.slug) {
              <li><a [routerLink]="['/services', service.slug]">{{ service.title }}</a></li>
            }
          </ul>
        </div>
        <div>
          <h3>Contact Us</h3>
          <ul>
            <li><i class="fa-solid fa-location-dot"></i> {{ site().company.address }}</li>
            <li><a [href]="phone"><i class="fa-solid fa-phone"></i> {{ site().company.phone }}</a></li>
            <li><a [href]="'mailto:' + site().company.email"><i class="fa-solid fa-envelope"></i> {{ site().company.email }}</a></li>
            <li><i class="fa-regular fa-clock"></i> {{ site().company.hours }}</li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© {{ year }} {{ site().company.legalName }}. All rights reserved.</span>
        <span>
          <a routerLink="/privacy">Privacy Policy</a>
          <a routerLink="/terms">Terms of Service</a>
        </span>
      </div>
    </footer>
  `
})
export class FooterComponent {
  private content = inject(ContentService);
  site = this.content.content;
  year = new Date().getFullYear();

  get phone() {
    return telHref(this.site().company.phone);
  }
}
