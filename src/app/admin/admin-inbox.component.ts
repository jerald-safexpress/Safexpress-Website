import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { InboxService } from '../inbox/inbox.service';
import { InboxKind, InboxMessage } from '../inbox/inbox.models';

type Filter = 'all' | InboxKind;

@Component({
  selector: 'app-admin-inbox',
  imports: [DatePipe],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Inbox</h1>
          <p>Contact messages and quote requests from the public site. Stored in this browser until you delete them.</p>
        </div>
        <div class="admin-actions">
          <button class="admin-btn ghost" type="button" (click)="inbox.markAllRead()" [disabled]="!unread()">Mark all read</button>
          <button class="admin-btn danger" type="button" (click)="clearAll()" [disabled]="!inbox.messages().length">Clear inbox</button>
        </div>
      </header>

      <div class="admin-inbox-filters">
        @for (tab of tabs; track tab.id) {
          <button
            type="button"
            class="admin-inbox-filter"
            [class.on]="filter() === tab.id"
            (click)="setFilter(tab.id)"
          >{{ tab.label }}</button>
        }
        @if (unread()) {
          <span class="admin-inbox-count">{{ unread() }} unread</span>
        }
      </div>

      <div class="admin-inbox">
        <aside class="admin-inbox-list">
          @if (!filtered().length) {
            <p class="admin-muted" style="padding: 18px">No messages yet. Submit the Contact or Quote form on the public site to see them here.</p>
          }
          @for (item of filtered(); track item.id) {
            <button
              type="button"
              class="admin-inbox-item"
              [class.on]="selected()?.id === item.id"
              [class.unread]="!item.read"
              (click)="open(item)"
            >
              <span class="admin-inbox-item-top">
                <strong>{{ item.name || 'Anonymous' }}</strong>
                <time>{{ item.createdAt | date: 'MMM d, h:mm a' }}</time>
              </span>
              <span class="admin-inbox-item-meta">
                <em>{{ item.kind === 'quote' ? 'Quote' : 'Contact' }}</em>
                · {{ item.email }}
              </span>
              <span class="admin-inbox-item-preview">{{ preview(item) }}</span>
            </button>
          }
        </aside>

        <section class="admin-inbox-detail">
          @if (selected(); as msg) {
            <div class="admin-inbox-detail-head">
              <div>
                <p class="admin-kicker">{{ msg.kind === 'quote' ? 'Quote request' : 'Contact inquiry' }}</p>
                <h2>{{ msg.name }}</h2>
                <p class="admin-muted" style="margin: 0">{{ msg.createdAt | date: 'fullDate' }} · {{ msg.createdAt | date: 'shortTime' }}</p>
              </div>
              <div class="admin-actions">
                <button class="admin-btn ghost" type="button" (click)="toggleRead(msg)">{{ msg.read ? 'Mark unread' : 'Mark read' }}</button>
                <a class="admin-btn" [href]="mailto(msg)">Reply by email</a>
                <button class="admin-btn danger" type="button" (click)="remove(msg.id)">Delete</button>
              </div>
            </div>

            <dl class="admin-inbox-fields">
              <div><dt>Email</dt><dd><a [href]="'mailto:' + msg.email">{{ msg.email }}</a></dd></div>
              @if (msg.phone) { <div><dt>Phone</dt><dd><a [href]="'tel:' + msg.phone">{{ msg.phone }}</a></dd></div> }
              @if (msg.company) { <div><dt>Company</dt><dd>{{ msg.company }}</dd></div> }
              @if (msg.service) { <div><dt>Service</dt><dd>{{ msg.service }}</dd></div> }
              @if (msg.kind === 'quote') {
                @if (msg.date) { <div><dt>Ready date</dt><dd>{{ msg.date }}</dd></div> }
                @if (msg.origin) { <div><dt>Origin</dt><dd>{{ msg.origin }}</dd></div> }
                @if (msg.destination) { <div><dt>Destination</dt><dd>{{ msg.destination }}</dd></div> }
                @if (msg.cargo) { <div><dt>Cargo</dt><dd>{{ msg.cargo }}</dd></div> }
                @if (msg.weight) { <div><dt>Weight</dt><dd>{{ msg.weight }}</dd></div> }
              }
            </dl>

            <div class="admin-inbox-body">
              <h3>{{ msg.kind === 'quote' ? 'Notes' : 'Message' }}</h3>
              <p>{{ msg.message || '—' }}</p>
            </div>
          } @else {
            <div class="admin-inbox-empty">
              <i class="fa-regular fa-envelope"></i>
              <p>Select a message to read it.</p>
            </div>
          }
        </section>
      </div>
    </div>
  `
})
export class AdminInboxComponent {
  inbox = inject(InboxService);
  filter = signal<Filter>('all');
  selectedId = signal<string | null>(null);

  unread = this.inbox.unreadCount;

  tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'contact', label: 'Contact' },
    { id: 'quote', label: 'Quotes' }
  ];

  filtered = computed(() => {
    const kind = this.filter();
    const items = this.inbox.messages();
    return kind === 'all' ? items : items.filter((m) => m.kind === kind);
  });

  selected = computed(() => {
    const id = this.selectedId();
    if (!id) return null;
    return this.inbox.get(id);
  });

  setFilter(id: Filter) {
    this.filter.set(id);
    const stillVisible = this.filtered().some((m) => m.id === this.selectedId());
    if (!stillVisible) this.selectedId.set(null);
  }

  open(item: InboxMessage) {
    this.selectedId.set(item.id);
    if (!item.read) this.inbox.markRead(item.id, true);
  }

  toggleRead(item: InboxMessage) {
    this.inbox.markRead(item.id, !item.read);
  }

  remove(id: string) {
    if (!confirm('Delete this message?')) return;
    this.inbox.remove(id);
    if (this.selectedId() === id) this.selectedId.set(null);
  }

  clearAll() {
    if (!confirm('Delete every message in the inbox?')) return;
    this.inbox.clear();
    this.selectedId.set(null);
  }

  preview(item: InboxMessage): string {
    if (item.kind === 'quote') {
      const lane = [item.origin, item.destination].filter(Boolean).join(' → ');
      return lane || item.message || item.service || 'Quote request';
    }
    return item.message || item.service || 'Contact inquiry';
  }

  mailto(item: InboxMessage): string {
    const subject = encodeURIComponent(
      item.kind === 'quote'
        ? `Re: Quote request from ${item.name}`
        : `Re: Your message to SFX Logistics`
    );
    const body = encodeURIComponent(`Hi ${item.name},\n\nThanks for reaching out.\n\n`);
    return `mailto:${item.email}?subject=${subject}&body=${body}`;
  }
}
