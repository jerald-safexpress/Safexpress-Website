import { Injectable, computed, signal } from '@angular/core';
import { InboxMessage, NewInboxMessage } from './inbox.models';

const STORAGE_KEY = 'sfx-inbox-messages';

@Injectable({ providedIn: 'root' })
export class InboxService {
  readonly messages = signal<InboxMessage[]>(this.load());
  readonly unreadCount = computed(() => this.messages().filter((m) => !m.read).length);

  list(kind?: InboxMessage['kind'] | 'all') {
    const items = this.messages();
    if (!kind || kind === 'all') return items;
    return items.filter((m) => m.kind === kind);
  }

  get(id: string): InboxMessage | null {
    return this.messages().find((m) => m.id === id) ?? null;
  }

  add(input: NewInboxMessage): InboxMessage {
    const entry: InboxMessage = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
      read: false,
      name: input.name.trim(),
      email: input.email.trim(),
      phone: (input.phone || '').trim(),
      company: (input.company || '').trim(),
      service: (input.service || '').trim(),
      message: (input.message || '').trim()
    };
    const next = [entry, ...this.messages()];
    this.persist(next);
    return entry;
  }

  markRead(id: string, read = true) {
    this.persist(this.messages().map((m) => (m.id === id ? { ...m, read } : m)));
  }

  markAllRead() {
    this.persist(this.messages().map((m) => ({ ...m, read: true })));
  }

  remove(id: string) {
    this.persist(this.messages().filter((m) => m.id !== id));
  }

  clear() {
    this.persist([]);
  }

  private persist(items: InboxMessage[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this.messages.set(items);
  }

  private load(): InboxMessage[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as InboxMessage[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
