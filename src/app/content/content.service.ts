import { Injectable, signal } from '@angular/core';
import { SITE, SiteContent, brandParts, PostItem, ServiceItem, Shipment } from './site.content';

const STORAGE_KEY = 'sfx-site-content';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly content = signal<SiteContent>(this.load());

  snapshot(): SiteContent {
    return this.content();
  }

  brand() {
    const company = this.content().company;
    return brandParts(company.name, company.accentLetters);
  }

  serviceBySlug(slug: string): ServiceItem | null {
    return this.content().services.find((service) => service.slug === slug) ?? null;
  }

  postBySlug(slug: string): PostItem | null {
    return this.content().posts.find((post) => post.slug === slug) ?? null;
  }

  shipmentById(id: string): Shipment | null {
    const key = id.trim().toLowerCase();
    return this.content().shipments.find((shipment) => shipment.id.toLowerCase() === key) ?? null;
  }

  save(next: SiteContent) {
    const copy = clone(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
    this.content.set(copy);
    this.applyTheme(copy.ui);
    this.applyDocumentMeta(copy.company);
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = clone(SITE);
    this.content.set(fresh);
    this.applyTheme(fresh.ui);
    this.applyDocumentMeta(fresh.company);
  }

  exportJson(): string {
    return JSON.stringify(this.content(), null, 2);
  }

  importJson(raw: string) {
    const parsed = JSON.parse(raw) as SiteContent;
    if (!parsed?.company?.name || !Array.isArray(parsed.services)) {
      throw new Error('That file does not look like SFX site content.');
    }
    this.save(parsed);
  }

  hasSavedOverrides(): boolean {
    return !!localStorage.getItem(STORAGE_KEY);
  }

  initTheme() {
    const site = this.content();
    this.applyTheme(site.ui);
    this.applyDocumentMeta(site.company);
  }

  /** Live-preview CSS variables without writing localStorage. */
  previewTheme(ui: SiteContent['ui']) {
    this.applyTheme(ui);
  }

  /** Update browser tab favicon from saved company branding. */
  applyDocumentMeta(company: SiteContent['company']) {
    if (typeof document === 'undefined') return;
    const href = company.favicon?.trim() || 'favicon.ico';
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    if (href.startsWith('data:image/svg')) link.type = 'image/svg+xml';
    else if (href.startsWith('data:image/png')) link.type = 'image/png';
    else if (href.startsWith('data:image/jpeg') || href.startsWith('data:image/jpg')) link.type = 'image/jpeg';
    else if (href.startsWith('data:image/webp')) link.type = 'image/webp';
    else if (href.startsWith('data:image/x-icon') || href.endsWith('.ico')) link.type = 'image/x-icon';
    else link.removeAttribute('type');
    link.href = href;
  }

  private load(): SiteContent {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return clone(SITE);
      const saved = JSON.parse(raw) as SiteContent;
      return mergeContent(clone(SITE), saved);
    } catch {
      return clone(SITE);
    }
  }

  private applyTheme(ui: SiteContent['ui']) {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const brand = ui.brandColor || '#2563eb';
    const accent = ui.accentTextColor || brand;
    const buttonBg = ui.buttonBg || brand;
    const buttonHover = ui.buttonHover || darkenHex(buttonBg, 18);
    root.style.setProperty('--blue', brand);
    root.style.setProperty('--blue-dark', buttonHover);
    root.style.setProperty('--accent-text', accent);
    root.style.setProperty('--button-bg', buttonBg);
    root.style.setProperty('--button-text', ui.buttonText || '#ffffff');
    root.style.setProperty('--button-hover', buttonHover);
    root.style.setProperty('--heading', ui.headingColor || '#0f172a');
    root.style.setProperty('--text', ui.textColor || '#64748b');
    root.style.setProperty('--ghost-button', ui.ghostButtonColor || '#ffffff');
    root.style.setProperty('--logo-word', ui.logoWordColor || '#0f172a');
    root.style.setProperty('--logo-accent', ui.logoAccentColor || brand);
    root.style.setProperty('--logo-word-on-dark', ui.logoWordOnDark || '#ffffff');
    root.style.setProperty('--logo-label', ui.logoLabelColor || '#1e3a8a');
    root.style.setProperty('--logo-label-on-dark', ui.logoLabelOnDark || '#cbd5e1');
    root.style.setProperty('--hero-kicker-size', `${ui.heroKickerSize || 13}px`);
    root.style.setProperty('--hero-title-size', `${ui.heroTitleSize || 72}px`);
    root.style.setProperty('--hero-text-size', `${ui.heroTextSize || 18}px`);
    root.style.setProperty('--hero-stat-value-size', `${ui.heroStatValueSize || 44}px`);
    root.style.setProperty('--hero-stat-label-size', `${ui.heroStatLabelSize || 12}px`);
    root.style.setProperty('--section-label-size', `${ui.sectionLabelSize || 13}px`);
  }
}

function darkenHex(hex: string, amount: number): string {
  const raw = hex.replace('#', '');
  if (raw.length !== 6) return hex;
  const num = Number.parseInt(raw, 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Keep new default fields when older saved JSON is missing them. */
function mergeContent(base: SiteContent, saved: SiteContent): SiteContent {
  return {
    ...base,
    ...saved,
    company: {
      ...base.company,
      ...saved.company,
      logo: saved.company?.logo ?? base.company.logo,
      logoLight: saved.company?.logoLight ?? base.company.logoLight,
      logoStyle: saved.company?.logoStyle ?? base.company.logoStyle,
      logoLabel: saved.company?.logoLabel ?? base.company.logoLabel,
      browserTitle: saved.company?.browserTitle ?? base.company.browserTitle,
      favicon: saved.company?.favicon ?? base.company.favicon,
      socials: saved.company?.socials ?? base.company.socials
    },
    ui: { ...base.ui, ...saved.ui },
    nav: saved.nav ?? base.nav,
    hero: { ...base.hero, ...saved.hero, stats: saved.hero?.stats ?? base.hero.stats, primary: { ...base.hero.primary, ...saved.hero?.primary }, secondary: { ...base.hero.secondary, ...saved.hero?.secondary } },
    features: saved.features ?? base.features,
    trackingBand: { ...base.trackingBand, ...saved.trackingBand, stats: saved.trackingBand?.stats ?? base.trackingBand.stats },
    servicesIntro: { ...base.servicesIntro, ...saved.servicesIntro },
    services: saved.services ?? base.services,
    why: { ...base.why, ...saved.why, points: saved.why?.points ?? base.why.points },
    processIntro: { ...base.processIntro, ...saved.processIntro },
    process: saved.process ?? base.process,
    testimonialsIntro: { ...base.testimonialsIntro, ...saved.testimonialsIntro },
    testimonials: saved.testimonials ?? base.testimonials,
    faqIntro: { ...base.faqIntro, ...saved.faqIntro },
    faqs: saved.faqs ?? base.faqs,
    blogIntro: { ...base.blogIntro, ...saved.blogIntro },
    posts: saved.posts ?? base.posts,
    shipments: saved.shipments ?? base.shipments,
    trackingPage: { ...base.trackingPage, ...saved.trackingPage },
    fleetIntro: { ...base.fleetIntro, ...saved.fleetIntro },
    fleet: saved.fleet ?? base.fleet,
    teamIntro: { ...base.teamIntro, ...saved.teamIntro },
    team: saved.team ?? base.team,
    careersIntro: { ...base.careersIntro, ...saved.careersIntro },
    jobs: saved.jobs ?? base.jobs,
    about: { ...base.about, ...saved.about, text: saved.about?.text ?? base.about.text, points: saved.about?.points ?? base.about.points },
    contact: { ...base.contact, ...saved.contact, hours: saved.contact?.hours ?? base.contact.hours },
    quote: { ...base.quote, ...saved.quote },
    footer: { ...base.footer, ...saved.footer, links: saved.footer?.links ?? base.footer.links },
    legal: {
      privacy: { ...base.legal.privacy, ...saved.legal?.privacy, paragraphs: saved.legal?.privacy?.paragraphs ?? base.legal.privacy.paragraphs },
      terms: { ...base.legal.terms, ...saved.legal?.terms, paragraphs: saved.legal?.terms?.paragraphs ?? base.legal.terms.paragraphs }
    },
    notFound: { ...base.notFound, ...saved.notFound }
  };
}
