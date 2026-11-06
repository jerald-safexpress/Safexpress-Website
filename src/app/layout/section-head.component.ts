import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-head',
  template: `
    <div class="section-header" [class.align-left]="align === 'left'" [class.light]="light" [class.no-lines]="!lines">
      <span class="section-label">{{ label }}</span>
      <h2 class="section-title">{{ title }}</h2>
      @if (text) { <p class="section-description">{{ text }}</p> }
    </div>
  `
})
export class SectionHeadComponent {
  @Input() label = '';
  @Input() title = '';
  @Input() text = '';
  @Input() align: 'center' | 'left' = 'center';
  @Input() light = false;
  @Input() lines = true;
}
