import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { AdminImageFieldComponent } from './admin-image-field.component';

@Component({
  selector: 'app-admin-people',
  imports: [FormsModule, AdminImageFieldComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Team & Fleet</h1>
          <p>People, careers, and equipment cards — including photos.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <h2 class="admin-sub">Team intro</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.teamIntro.title" name="tiTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.teamIntro.text" name="tiText"></textarea></label>
      </div>
      <div class="admin-actions" style="margin-bottom:12px">
        <button class="admin-btn ghost" type="button" (click)="draft.team.push({ name: 'New person', role: 'Role', text: 'Bio', image: draft.ui.banner })">Add person</button>
      </div>
      @for (person of draft.team; track $index; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Name</span><input [(ngModel)]="person.name" [name]="'pn' + i" /></label>
            <label class="admin-field"><span>Role</span><input [(ngModel)]="person.role" [name]="'pr' + i" /></label>
            <label class="admin-field full"><span>Bio</span><textarea rows="2" [(ngModel)]="person.text" [name]="'pt' + i"></textarea></label>
          </div>
          <app-admin-image-field [label]="'Photo — ' + (person.name || 'team member')" [name]="'pi' + i" [(value)]="person.image" [compact]="true" />
          <button class="admin-btn danger" type="button" (click)="draft.team.splice(i, 1)">Remove</button>
        </div>
      }

      <h2 class="admin-sub">Fleet intro</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.fleetIntro.title" name="fiTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.fleetIntro.text" name="fiText"></textarea></label>
      </div>
      <div class="admin-actions" style="margin-bottom:12px">
        <button class="admin-btn ghost" type="button" (click)="draft.fleet.push({ title: 'New asset', meta: 'Meta', text: 'Description', image: draft.ui.banner })">Add fleet item</button>
      </div>
      @for (item of draft.fleet; track $index; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Title</span><input [(ngModel)]="item.title" [name]="'ft' + i" /></label>
            <label class="admin-field"><span>Meta</span><input [(ngModel)]="item.meta" [name]="'fm' + i" /></label>
            <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="item.text" [name]="'fx' + i"></textarea></label>
          </div>
          <app-admin-image-field [label]="'Image — ' + (item.title || 'fleet')" [name]="'fimg' + i" [(value)]="item.image" />
          <button class="admin-btn danger" type="button" (click)="draft.fleet.splice(i, 1)">Remove</button>
        </div>
      }

      <h2 class="admin-sub">Careers</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.careersIntro.title" name="ciTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.careersIntro.text" name="ciText"></textarea></label>
      </div>
      @for (job of draft.jobs; track $index; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Title</span><input [(ngModel)]="job.title" [name]="'jt' + i" /></label>
            <label class="admin-field"><span>Location</span><input [(ngModel)]="job.location" [name]="'jl' + i" /></label>
            <label class="admin-field"><span>Type</span><input [(ngModel)]="job.type" [name]="'jy' + i" /></label>
            <label class="admin-field full"><span>Summary</span><textarea rows="2" [(ngModel)]="job.summary" [name]="'js' + i"></textarea></label>
          </div>
          <button class="admin-btn danger" type="button" (click)="draft.jobs.splice(i, 1)">Remove</button>
        </div>
      }
      <button class="admin-btn ghost" type="button" (click)="draft.jobs.push({ title: 'New role', location: 'Singapore', type: 'Full time', summary: 'Role summary' })">Add job</button>
    </div>
  `
})
export class AdminPeopleComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';

  save() {
    this.content.save(this.draft);
    this.message = 'Team, fleet, and careers saved.';
  }
}
