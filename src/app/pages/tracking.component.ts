import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Shipment } from '../content/site.content';
import { ContentService } from '../content/content.service';
import { PageBannerComponent } from '../layout/page-banner.component';

@Component({
  selector: 'app-tracking',
  imports: [PageBannerComponent],
  template: `
    <app-page-banner [title]="site().trackingPage.title" />
    <section class="section soft">
      <div class="container" style="max-width: 860px">
        <div class="form-card">
          <h2>{{ site().trackingBand.title }}</h2>
          <p>{{ site().trackingPage.text }}</p>
          <form class="track-search" (submit)="lookup(box.value); $event.preventDefault()">
            <input #box [value]="query" [placeholder]="site().trackingBand.placeholder" [attr.aria-label]="site().trackingBand.placeholder" />
            <button class="btn btn-primary" type="submit">Track</button>
          </form>
          @if (missed) { <p class="miss">{{ site().trackingPage.hint }}</p> }
        </div>

        @if (shipment) {
          <div class="form-card" style="margin-top: 22px">
            <div class="result-top">
              <div>
                <h2>{{ shipment.id }}</h2>
                <p>{{ shipment.origin }} to {{ shipment.destination }} · {{ shipment.service }}</p>
              </div>
              <span class="status">{{ shipment.status }}</span>
            </div>
            <div class="progress"><span [style.width.%]="shipment.progress"></span></div>
            <p>Estimated arrival {{ shipment.eta }}</p>
            <ul class="timeline">
              @for (event of shipment.events; track event.title) {
                <li [class.done]="event.done">
                  <strong>{{ event.title }}</strong>
                  <span>{{ event.place }} · {{ event.time }}</span>
                </li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `
})
export class TrackingComponent implements OnInit {
  private content = inject(ContentService);
  site = this.content.content;
  query = '';
  missed = false;
  shipment: Shipment | null = null;
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id') || '';
      this.query = id;
      if (id) this.lookup(id);
    });
  }

  lookup(id: string) {
    this.query = id.trim();
    this.shipment = this.query ? this.content.shipmentById(this.query) : null;
    this.missed = !!this.query && !this.shipment;
  }
}
