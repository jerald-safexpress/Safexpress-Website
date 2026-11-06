export type InboxKind = 'contact' | 'quote';

export interface InboxMessage {
  id: string;
  kind: InboxKind;
  createdAt: string;
  read: boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  /** Contact form body or quote notes */
  message: string;
  /** Quote-only fields */
  date?: string;
  origin?: string;
  destination?: string;
  cargo?: string;
  weight?: string;
}

export type NewInboxMessage = Omit<InboxMessage, 'id' | 'createdAt' | 'read'>;
