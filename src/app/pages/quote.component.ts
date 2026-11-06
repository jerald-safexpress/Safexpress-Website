import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { InboxService } from '../inbox/inbox.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-quote',
  imports: [FormsModule, PageBannerComponent],
  template: `
    <app-page-banner [title]="site().quote.title" />
    <section class="section soft">
      <div class="container" style="max-width: 980px">
        <form class="form-card" (ngSubmit)="send()" #form="ngForm">
          <h2>{{ site().quote.heading }}</h2>
          <p style="margin-bottom: 18px">{{ site().quote.text }}</p>
          @if (sent) {
            <p class="banner-success">Thank you, {{ sentName }}. Your quote request is in. We will reply with a rate shortly.</p>
          }
          <div class="form-row">
            <label class="field"><span>Your Name</span><input name="name" [(ngModel)]="name" required /></label>
            <label class="field"><span>Email Address</span><input type="email" name="email" [(ngModel)]="email" required /></label>
          </div>
          <div class="form-row">
            <label class="field"><span>Phone Number</span><input name="phone" [(ngModel)]="phone" /></label>
            <label class="field"><span>Company Name</span><input name="company" [(ngModel)]="company" /></label>
          </div>
          <div class="form-row">
            <label class="field">
              <span>Service Needed</span>
              <select name="service" [(ngModel)]="service" required>
                <option value="">Select a service</option>
                @for (item of site().services; track item.slug) {
                  <option [value]="item.title">{{ item.title }}</option>
                }
              </select>
            </label>
            <label class="field"><span>Ready Date</span><input type="date" name="date" [(ngModel)]="date" /></label>
          </div>
          <div class="form-row">
            <label class="field"><span>Origin</span><input name="origin" [(ngModel)]="origin" required placeholder="City, country" /></label>
            <label class="field"><span>Destination</span><input name="destination" [(ngModel)]="destination" required placeholder="City, country" /></label>
          </div>
          <div class="form-row">
            <label class="field"><span>Cargo Type</span><input name="cargo" [(ngModel)]="cargo" placeholder="General, reefer, oversized" /></label>
            <label class="field"><span>Weight</span><input name="weight" [(ngModel)]="weight" placeholder="e.g. 1200 kg" /></label>
          </div>
          <label class="field">
            <span>Notes</span>
            <textarea name="notes" [(ngModel)]="notes" placeholder="Dimensions, incoterms, or anything else we should know"></textarea>
          </label>
          <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Request Quote</button>
        </form>
      </div>
    </section>
  `
})
export class QuoteComponent {
  private content = inject(ContentService);
  private inbox = inject(InboxService);
  site = this.content.content;
  name = '';
  email = '';
  phone = '';
  company = '';
  service = '';
  date = '';
  origin = '';
  destination = '';
  cargo = '';
  weight = '';
  notes = '';
  sent = false;
  sentName = '';

  send() {
    this.inbox.add({
      kind: 'quote',
      name: this.name,
      email: this.email,
      phone: this.phone,
      company: this.company,
      service: this.service,
      message: this.notes,
      date: this.date,
      origin: this.origin,
      destination: this.destination,
      cargo: this.cargo,
      weight: this.weight
    });
    this.sentName = this.name;
    this.sent = true;
    this.name = '';
    this.email = '';
    this.phone = '';
    this.company = '';
    this.service = '';
    this.date = '';
    this.origin = '';
    this.destination = '';
    this.cargo = '';
    this.weight = '';
    this.notes = '';
  }
}
