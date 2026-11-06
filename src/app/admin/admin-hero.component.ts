import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { linesToList, listToLines } from './admin-forms';
import { AdminImageFieldComponent } from './admin-image-field.component';
import { AdminIconPickerComponent } from './admin-icon-picker.component';

@Component({
  selector: 'app-admin-hero',
  imports: [FormsModule, AdminImageFieldComponent, AdminIconPickerComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Home page</h1>
          <p>Hero, feature cards, why-us band, and process steps. Upload images or paste URLs.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save home content</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <h2 class="admin-sub">Hero</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Kicker</span><input [(ngModel)]="draft.hero.kicker" name="kicker" /></label>
        <label class="admin-field"><span>Title (white)</span><input [(ngModel)]="draft.hero.title" name="title" /></label>
        <label class="admin-field"><span>Title accent (blue)</span><input [(ngModel)]="draft.hero.titleAccent" name="accent" /></label>
        <label class="admin-field full"><span>Supporting text</span><textarea rows="3" [(ngModel)]="draft.hero.text" name="text"></textarea></label>
        <label class="admin-field"><span>Primary button label</span><input [(ngModel)]="draft.hero.primary.label" name="pLabel" /></label>
        <label class="admin-field"><span>Primary button path</span><input [(ngModel)]="draft.hero.primary.path" name="pPath" /></label>
        <label class="admin-field"><span>Secondary button label</span><input [(ngModel)]="draft.hero.secondary.label" name="sLabel" /></label>
        <label class="admin-field"><span>Secondary button path</span><input [(ngModel)]="draft.hero.secondary.path" name="sPath" /></label>
      </div>
      <app-admin-image-field label="Hero background image" name="heroImage" [(value)]="draft.hero.image" />

      <h2 class="admin-sub">Hero stats</h2>
      @for (stat of draft.hero.stats; track $index; let i = $index) {
        <div class="admin-row-2">
          <label class="admin-field"><span>Value</span><input [(ngModel)]="stat.value" [name]="'hv' + i" /></label>
          <label class="admin-field"><span>Label</span><input [(ngModel)]="stat.label" [name]="'hl' + i" /></label>
        </div>
      }

      <h2 class="admin-sub">Feature cards</h2>
      @for (feature of draft.features; track $index; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Title / label</span><input [(ngModel)]="feature.title" [name]="'ft' + i" /></label>
            <label class="admin-field"><span>Number</span><input [(ngModel)]="feature.number" [name]="'fn' + i" /></label>
            <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="feature.text" [name]="'fx' + i"></textarea></label>
          </div>
          <app-admin-icon-picker [label]="'Feature icon — ' + (feature.title || 'card')" [name]="'fi' + i" [(value)]="feature.icon" />
        </div>
      }

      <h2 class="admin-sub">Why choose us</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Label</span><input [(ngModel)]="draft.why.label" name="wLabel" /></label>
        <label class="admin-field"><span>Button label</span><input [(ngModel)]="draft.why.button" name="wBtn" /></label>
        <label class="admin-field full"><span>Title</span><input [(ngModel)]="draft.why.title" name="wTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="3" [(ngModel)]="draft.why.text" name="wText"></textarea></label>
        <label class="admin-field full"><span>Bullet points (one per line)</span><textarea rows="4" [(ngModel)]="whyPoints" name="wPoints"></textarea></label>
      </div>
      <app-admin-image-field label="Why choose us background" name="wImage" [(value)]="draft.why.image" />

      <h2 class="admin-sub">Process</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Section label</span><input [(ngModel)]="draft.processIntro.label" name="piLabel" /></label>
        <label class="admin-field"><span>Section title</span><input [(ngModel)]="draft.processIntro.title" name="piTitle" /></label>
        <label class="admin-field full"><span>Section text</span><input [(ngModel)]="draft.processIntro.text" name="piText" /></label>
      </div>
      @for (step of draft.process; track $index; let i = $index) {
        <div class="admin-box">
          <div class="admin-row-2">
            <label class="admin-field"><span>Title / label</span><input [(ngModel)]="step.title" [name]="'pt' + i" /></label>
            <label class="admin-field"><span>Text</span><input [(ngModel)]="step.text" [name]="'px' + i" /></label>
          </div>
          <app-admin-icon-picker [label]="'Step icon — ' + (step.title || 'process')" [name]="'pi' + i" [(value)]="step.icon" />
        </div>
      }

      <h2 class="admin-sub">Tracking band on home</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.trackingBand.title" name="tbTitle" /></label>
        <label class="admin-field"><span>Placeholder</span><input [(ngModel)]="draft.trackingBand.placeholder" name="tbPh" /></label>
        <label class="admin-field full"><span>Text</span><input [(ngModel)]="draft.trackingBand.text" name="tbText" /></label>
      </div>
      <app-admin-image-field label="Tracking band photo" name="tbImage" [(value)]="draft.trackingBand.image" />
      @for (stat of draft.trackingBand.stats; track $index; let i = $index) {
        <div class="admin-row-2">
          <label class="admin-field"><span>Value</span><input [(ngModel)]="stat.value" [name]="'tv' + i" /></label>
          <label class="admin-field"><span>Label</span><input [(ngModel)]="stat.label" [name]="'tl' + i" /></label>
        </div>
      }
    </div>
  `
})
export class AdminHeroComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  whyPoints = listToLines(this.draft.why.points);
  message = '';

  save() {
    this.draft.why.points = linesToList(this.whyPoints);
    this.content.save(this.draft);
    this.message = 'Home content saved.';
  }
}
