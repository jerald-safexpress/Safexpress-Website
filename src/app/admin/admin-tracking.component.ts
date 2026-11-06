import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';

@Component({
  selector: 'app-admin-tracking',
  imports: [FormsModule],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Tracking samples</h1>
          <p>Demo shipments returned by the tracking form.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save tracking</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <div class="admin-grid-2">
        <label class="admin-field"><span>Page title</span><input [(ngModel)]="draft.trackingPage.title" name="tpTitle" /></label>
        <label class="admin-field full"><span>Help text</span><textarea rows="2" [(ngModel)]="draft.trackingPage.text" name="tpText"></textarea></label>
        <label class="admin-field full"><span>Not found hint</span><input [(ngModel)]="draft.trackingPage.hint" name="tpHint" /></label>
      </div>

      <button class="admin-btn ghost" type="button" (click)="add()">Add shipment</button>
      @for (ship of draft.shipments; track ship.id; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Tracking ID</span><input [(ngModel)]="ship.id" [name]="'id' + i" /></label>
            <label class="admin-field"><span>Status</span><input [(ngModel)]="ship.status" [name]="'st' + i" /></label>
            <label class="admin-field"><span>Origin</span><input [(ngModel)]="ship.origin" [name]="'or' + i" /></label>
            <label class="admin-field"><span>Destination</span><input [(ngModel)]="ship.destination" [name]="'de' + i" /></label>
            <label class="admin-field"><span>Service</span><input [(ngModel)]="ship.service" [name]="'sv' + i" /></label>
            <label class="admin-field"><span>ETA</span><input [(ngModel)]="ship.eta" [name]="'eta' + i" /></label>
            <label class="admin-field"><span>Progress %</span><input type="number" min="0" max="100" [(ngModel)]="ship.progress" [name]="'pr' + i" /></label>
          </div>
          <h3 class="admin-mini">Events</h3>
          @for (event of ship.events; track $index; let e = $index) {
            <div class="admin-row-3">
              <label class="admin-field"><span>Title</span><input [(ngModel)]="event.title" [name]="'et' + i + e" /></label>
              <label class="admin-field"><span>Place</span><input [(ngModel)]="event.place" [name]="'ep' + i + e" /></label>
              <label class="admin-field"><span>Time</span><input [(ngModel)]="event.time" [name]="'em' + i + e" /></label>
            </div>
            <label class="admin-check"><input type="checkbox" [(ngModel)]="event.done" [name]="'ed' + i + e" /> Done</label>
          }
          <button class="admin-btn ghost" type="button" (click)="ship.events.push({ title: 'New event', place: '', time: 'Pending', done: false })">Add event</button>
          <button class="admin-btn danger" type="button" (click)="draft.shipments.splice(i, 1)">Remove shipment</button>
        </div>
      }
    </div>
  `
})
export class AdminTrackingComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';

  add() {
    this.draft.shipments.push({
      id: 'SFX-' + Math.floor(10000 + Math.random() * 89999),
      status: 'In Transit',
      origin: 'Singapore',
      destination: 'Jakarta',
      service: 'Ocean Freight',
      eta: 'TBD',
      progress: 40,
      events: [
        { title: 'Booking confirmed', place: 'Singapore', time: 'Today', done: true },
        { title: 'In transit', place: 'At sea', time: 'Pending', done: false }
      ]
    });
  }

  save() {
    this.content.save(this.draft);
    this.message = 'Tracking samples saved.';
  }
}
