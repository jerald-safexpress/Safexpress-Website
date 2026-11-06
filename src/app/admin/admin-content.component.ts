import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../content/content.service';
import { SiteContent } from '../content/site.content';
import { slugify } from './admin-forms';
import { AdminImageFieldComponent } from './admin-image-field.component';

@Component({
  selector: 'app-admin-content',
  imports: [FormsModule, AdminImageFieldComponent],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Blog, FAQ & testimonials</h1>
          <p>Articles, questions, customer quotes, and their photos.</p>
        </div>
        <button class="admin-btn" type="button" (click)="save()">Save</button>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }

      <h2 class="admin-sub">Blog intro</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Label</span><input [(ngModel)]="draft.blogIntro.label" name="biLabel" /></label>
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.blogIntro.title" name="biTitle" /></label>
        <label class="admin-field full"><span>Text</span><textarea rows="2" [(ngModel)]="draft.blogIntro.text" name="biText"></textarea></label>
      </div>
      <button class="admin-btn ghost" type="button" (click)="addPost()">Add post</button>
      @for (post of draft.posts; track post.slug; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Title</span><input [(ngModel)]="post.title" [name]="'bt' + i" (ngModelChange)="post.slug = post.slug || slug(post.title)" /></label>
            <label class="admin-field"><span>Slug</span><input [(ngModel)]="post.slug" [name]="'bs' + i" /></label>
            <label class="admin-field"><span>Date</span><input [(ngModel)]="post.date" [name]="'bd' + i" /></label>
            <label class="admin-field full"><span>Excerpt</span><textarea rows="2" [(ngModel)]="post.excerpt" [name]="'be' + i"></textarea></label>
            <label class="admin-field full"><span>Body (blank line between paragraphs)</span>
              <textarea rows="5" [ngModel]="post.paragraphs.join('\n\n')" (ngModelChange)="post.paragraphs = split($event)" [name]="'bp' + i"></textarea>
            </label>
          </div>
          <app-admin-image-field [label]="'Cover — ' + (post.title || 'post')" [name]="'bimg' + i" [(value)]="post.image" />
          <button class="admin-btn danger" type="button" (click)="draft.posts.splice(i, 1)">Remove post</button>
        </div>
      }

      <h2 class="admin-sub">FAQ</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Label</span><input [(ngModel)]="draft.faqIntro.label" name="fiLabel" /></label>
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.faqIntro.title" name="fiTitle" /></label>
      </div>
      @for (faq of draft.faqs; track $index; let i = $index) {
        <div class="admin-box">
          <label class="admin-field"><span>Question</span><input [(ngModel)]="faq.question" [name]="'fq' + i" /></label>
          <label class="admin-field"><span>Answer</span><textarea rows="3" [(ngModel)]="faq.answer" [name]="'fa' + i"></textarea></label>
          <button class="admin-btn danger" type="button" (click)="draft.faqs.splice(i, 1)">Remove</button>
        </div>
      }
      <button class="admin-btn ghost" type="button" (click)="draft.faqs.push({ question: 'New question?', answer: 'Answer.' })">Add FAQ</button>

      <h2 class="admin-sub">Testimonials</h2>
      <div class="admin-grid-2">
        <label class="admin-field"><span>Label</span><input [(ngModel)]="draft.testimonialsIntro.label" name="ttLabel" /></label>
        <label class="admin-field"><span>Title</span><input [(ngModel)]="draft.testimonialsIntro.title" name="ttTitle" /></label>
      </div>
      @for (item of draft.testimonials; track item.id; let i = $index) {
        <div class="admin-box">
          <div class="admin-grid-2">
            <label class="admin-field"><span>Name</span><input [(ngModel)]="item.name" [name]="'tn' + i" /></label>
            <label class="admin-field"><span>Role</span><input [(ngModel)]="item.role" [name]="'tr' + i" /></label>
            <label class="admin-field full"><span>Quote</span><textarea rows="3" [(ngModel)]="item.quote" [name]="'tq' + i"></textarea></label>
          </div>
          <app-admin-image-field [label]="'Photo — ' + (item.name || 'customer')" [name]="'timg' + i" [(value)]="item.image" [compact]="true" />
          <button class="admin-btn danger" type="button" (click)="draft.testimonials.splice(i, 1)">Remove</button>
        </div>
      }
      <button class="admin-btn ghost" type="button" (click)="addTestimonial()">Add testimonial</button>
    </div>
  `
})
export class AdminContentComponent {
  private content = inject(ContentService);
  draft: SiteContent = structuredClone(this.content.snapshot());
  message = '';

  slug = slugify;

  split(value: string) {
    return value
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .filter(Boolean);
  }

  addPost() {
    const title = 'New article';
    this.draft.posts.push({
      slug: slugify(title) + '-' + Date.now().toString().slice(-4),
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: this.draft.ui.banner,
      excerpt: 'Short excerpt.',
      paragraphs: ['First paragraph.']
    });
  }

  addTestimonial() {
    this.draft.testimonials.push({
      id: 't' + Date.now(),
      name: 'New customer',
      role: 'Customer',
      quote: 'Write the quote here.',
      image: this.draft.ui.banner
    });
  }

  save() {
    this.content.save(this.draft);
    this.message = 'Blog, FAQ, and testimonials saved.';
  }
}
