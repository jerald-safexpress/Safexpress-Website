import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { linesToList, listToLines } from './admin-forms';
import { AdminImageFieldComponent } from './admin-image-field.component';

@Component({
  selector: 'app-admin-contact',
  imports: [FormsModule, AdminImageFieldComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Contact, about & footer</h1>
          <p>Inner pages, about photo, and footer copy.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <h2 class="admin-sub">About</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Page title</span><input [(ngModel)]="draft.about.title" name="aTitle" /></label>
        <label class="admin-field"><span>Heading</span><input [(ngModel)]="draft.about.heading" name="aHeading" /></label>
        <label class="admin-field full"><span>Paragraphs (blank line between)</span>
          <textarea rows="5" [(ngModel)]="aboutText" name="aText"></textarea>
        </label>
        <label class="admin-field full"><span>Points (one per line)</span>
          <textarea rows="4" [(ngModel)]="aboutPoints" name="aPoints"></textarea>
        </label>
      </div>
      <app-admin-image-field label="About page image" name="aImage" [(value)]="draft.about.image" />

      <h2 class="admin-sub">Contact page</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.contact.title" name="cTitle" /></label>
        <label class="admin-field"><span>Heading</span><input [(ngModel)]="draft.contact.heading" name="cHeading" /></label>
        <label class="admin-field"><span>Form title</span><input [(ngModel)]="draft.contact.formTitle" name="cForm" /></label>
        <label class="admin-field"><span>Hours title</span><input [(ngModel)]="draft.contact.hoursTitle" name="cHoursTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.contact.text" name="cText"></textarea></label>
        <label class="admin-field full"><span>Working hours lines</span><textarea rows="3" [(ngModel)]="contactHours" name="cHours"></textarea></label>
      </div>

      <h2 class="admin-sub">Quote page</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.quote.title" name="qTitle" /></label>
        <label class="admin-field"><span>Heading</span><input [(ngModel)]="draft.quote.heading" name="qHeading" /></label>
        <label class="admin-field"><span>Form title</span><input [(ngModel)]="draft.quote.formTitle" name="qForm" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.quote.text" name="qText"></textarea></label>
      </div>

      <h2 class="admin-sub">Footer</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>About title</span><input [(ngModel)]="draft.footer.aboutTitle" name="fTitle" /></label>
        <label class="admin-field full"><span>About text</span><textarea rows="3" [(ngModel)]="draft.footer.aboutText" name="fText"></textarea></label>
      </div>

      <h2 class="admin-sub">Default page banner</h2>
      <app-admin-image-field label="Banner used on inner pages" name="banner" [(value)]="draft.ui.banner" />
    </div>
  `
})
export class AdminContactComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  aboutText = this.draft.about.text.join('\n\n');
  aboutPoints = listToLines(this.draft.about.points);
  contactHours = listToLines(this.draft.contact.hours);
  message = '';

  save() {
    this.draft.about.text = this.aboutText
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);
    this.draft.about.points = linesToList(this.aboutPoints);
    this.draft.contact.hours = linesToList(this.contactHours);
    this.content.save(this.draft);
    this.message = 'Contact, about, and footer saved.';
  }
}
