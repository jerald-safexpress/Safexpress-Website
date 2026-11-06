import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { telHref } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { InboxService } from '../inbox/inbox.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, PageBannerComponent],
  template: `
    <app-page-banner [title]="site().contact.title" />
    <section class="section">
      <div class="container contact-grid">
        <div class="info-panel">
          <h2>{{ site().contact.heading }}</h2>
          <p>{{ site().contact.text }}</p>
          <div class="info-block">
            <p class="contact-line"><i class="fa-solid fa-location-dot"></i><span>{{ site().company.address }}</span></p>
            <p class="contact-line"><i class="fa-solid fa-phone"></i><a [href]="phone">{{ site().company.phone }}</a></p>
            <p class="contact-line"><i class="fa-solid fa-envelope"></i><a [href]="'mailto:' + site().company.email">{{ site().company.email }}</a></p>
          </div>
          <div class="info-block">
            <h3>{{ site().contact.hoursTitle }}</h3>
            <ul>
              @for (line of site().contact.hours; track line) {
                <li>{{ line }}</li>
              }
            </ul>
          </div>
        </div>
        <form class="form-card" (ngSubmit)="send()" #form="ngForm">
          <h2>{{ site().contact.formTitle }}</h2>
          @if (sent) {
            <p class="banner-success">Thank you, {{ sentName }}. We received your message and will reply shortly.</p>
          }
          <div class="form-row">
            <label class="field"><span>Your Name</span><input name="name" [(ngModel)]="name" required /></label>
            <label class="field"><span>Email Address</span><input type="email" name="email" [(ngModel)]="email" required /></label>
          </div>
          <div class="form-row">
            <label class="field"><span>Phone Number</span><input name="phone" [(ngModel)]="phoneNumber" /></label>
            <label class="field"><span>Company Name</span><input name="company" [(ngModel)]="company" /></label>
          </div>
          <label class="field">
            <span>Service Needed</span>
            <select name="service" [(ngModel)]="service">
              <option value="">Not specified</option>
              @for (item of site().services; track item.slug) {
                <option [value]="item.title">{{ item.title }}</option>
              }
            </select>
          </label>
          <label class="field">
            <span>Message</span>
            <textarea name="message" [(ngModel)]="message" required placeholder="Tell us about your shipment requirements"></textarea>
          </label>
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Send Message</button>
        </form>
      </div>
    </section>
    <iframe class="map-frame" [title]="site().company.legalName + ' location'" [src]="map"></iframe>
  `
})
export class ContactComponent {
  private content = inject(ContentService);
  private inbox = inject(InboxService);
  site = this.content.content;
  name = '';
  email = '';
  phoneNumber = '';
  company = '';
  service = '';
  message = '';
  sent = false;
  sentName = '';
  map: SafeResourceUrl;

  get phone() {
    return telHref(this.site().company.phone);
  }

  constructor() {
    const sanitizer = inject(DomSanitizer);
    const { lat, lng } = this.content.snapshot().company;
    const bbox = `${lng - 0.04},${lat - 0.025},${lng + 0.04},${lat + 0.025}`;
    this.map = sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`
    );
  }

  send() {
    this.inbox.add({
      kind: 'contact',
      name: this.name,
      email: this.email,
      phone: this.phoneNumber,
      company: this.company,
      service: this.service,
      message: this.message
    });
    this.sentName = this.name;
    this.sent = true;
    this.name = '';
    this.email = '';
    this.phoneNumber = '';
    this.company = '';
    this.service = '';
    this.message = '';
  }
}
