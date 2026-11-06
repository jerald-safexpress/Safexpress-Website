import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { ServiceItem, SiteContent } from '../content/site.content';
import { linesToList, listToLines, slugify } from './admin-forms';
import { AdminImageFieldComponent } from './admin-image-field.component';
import { AdminIconPickerComponent } from './admin-icon-picker.component';

@Component({
  selector: 'app-admin-services',
  imports: [FormsModule, AdminImageFieldComponent, AdminIconPickerComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Services</h1>
          <p>Section intro and each service card / detail page, including photos.</p>
        </div>
        <div class="admin-actions">
          <button class="admin-btn ghost" type="button" (click)="add()">Add service</button>
          <button class="admin-btn" type="button" (click)="save()">Save services</button>
        </div>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <div class="admin-grid-2">
        <label class="admin-field"><span>Section label</span><input [(ngModel)]="draft.servicesIntro.label" name="siLabel" /></label>
        <label class="admin-field"><span>Section title</span><input [(ngModel)]="draft.servicesIntro.title" name="siTitle" /></label>
        <label class="admin-field full"><span>Description</span><textarea rows="2" [(ngModel)]="draft.servicesIntro.text" name="siText"></textarea></label>
      </div>

      <div class="admin-split">
        <div class="admin-list">
          @for (service of draft.services; track service.slug; let i = $index) {
            <button type="button" [class.on]="i === index" (click)="select(i)">
              <i [class]="service.icon" aria-hidden="true"></i>
              <span>{{ service.title || 'Untitled' }}</span>
            </button>
          }
        </div>
        @if (current) {
          <div class="admin-box">
            <div class="admin-grid-2">
              <label class="admin-field"><span>Title / label</span><input [(ngModel)]="current.title" name="title" (ngModelChange)="onTitle()" /></label>
              <label class="admin-field"><span>Slug (URL)</span><input [(ngModel)]="current.slug" name="slug" /></label>
              <label class="admin-field full"><span>Card summary</span><textarea rows="2" [(ngModel)]="current.summary" name="summary"></textarea></label>
              <label class="admin-field full"><span>Detail lead</span><input [(ngModel)]="current.lead" name="lead" /></label>
              <label class="admin-field full"><span>Detail paragraphs (blank line between)</span><textarea rows="6" [(ngModel)]="paragraphs" name="paragraphs"></textarea></label>
              <label class="admin-field full"><span>Highlights (one per line)</span><textarea rows="4" [(ngModel)]="highlights" name="highlights"></textarea></label>
            </div>
            <app-admin-icon-picker label="Service icon" name="icon" [(value)]="current.icon" />
            <app-admin-image-field label="Service image" name="image" [(value)]="current.image" />
            <button class="admin-btn danger" type="button" (click)="remove()">Remove service</button>
          </div>
        }
      </div>
    </div>
  `
})
export class AdminServicesComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  index = 0;
  paragraphs = '';
  highlights = '';
  message = '';

  get current(): ServiceItem | null {
    return this.draft.services[this.index] ?? null;
  }

  constructor() {
    this.syncFields();
  }

  select(i: number) {
    this.flushFields();
    this.index = i;
    this.syncFields();
  }

  onTitle() {
    if (!this.current) return;
    if (!this.current.slug || this.current.slug.length < 2) {
      this.current.slug = slugify(this.current.title);
    }
  }

  add() {
    this.flushFields();
    this.draft.services.push({
      slug: 'new-service',
      title: 'New Service',
      icon: 'fa-solid fa-box',
      image: this.draft.ui.banner,
      summary: 'Short summary for the card.',
      lead: 'Lead sentence for the detail page.',
      paragraphs: ['Describe this service here.'],
      highlights: ['Highlight one', 'Highlight two']
    });
    this.index = this.draft.services.length - 1;
    this.syncFields();
  }

  remove() {
    if (!this.current || this.draft.services.length < 2) return;
    this.draft.services.splice(this.index, 1);
    this.index = Math.max(0, this.index - 1);
    this.syncFields();
  }

  save() {
    this.flushFields();
    this.content.save(this.draft);
    this.message = 'Services saved.';
  }

  private syncFields() {
    const item = this.current;
    this.paragraphs = item ? item.paragraphs.join('\n\n') : '';
    this.highlights = item ? listToLines(item.highlights) : '';
  }

  private flushFields() {
    const item = this.current;
    if (!item) return;
    item.paragraphs = this.paragraphs
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);
    item.highlights = linesToList(this.highlights);
  }
}
