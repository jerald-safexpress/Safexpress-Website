import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { readImageAsDataUrl } from './admin-image.util';

@Component({
  selector: 'app-admin-image-field',
  imports: [FormsModule],
  template: `
    <div class="admin-image-field" [class.compact]="compact">
      <label class="admin-field">
        <span>{{ label }}</span>
        <input
          [ngModel]="value"
          (ngModelChange)="valueChange.emit($event)"
          [name]="name"
          placeholder="Paste image URL or upload a file"
        />
      </label>
      <div class="admin-logo-preview" [class.wide]="!compact">
        @if (value) {
          <img [src]="value" [alt]="label + ' preview'" />
        } @else {
          <span>No image yet</span>
        }
      </div>
      <div class="admin-actions">
        <label class="admin-btn ghost file">
          Upload
          <input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,.svg" (change)="onFile($event)" hidden />
        </label>
        <button class="admin-btn ghost" type="button" (click)="clear()" [disabled]="!value">Clear</button>
      </div>
      @if (error) { <p class="admin-error">{{ error }}</p> }
    </div>
  `
})
export class AdminImageFieldComponent {
  @Input({ required: true }) label = 'Image';
  @Input() value = '';
  @Input() name = 'image';
  @Input() compact = false;
  @Output() valueChange = new EventEmitter<string>();

  error = '';

  clear() {
    this.error = '';
    this.valueChange.emit('');
  }

  async onFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    this.error = '';
    try {
      const dataUrl = await readImageAsDataUrl(file);
      this.valueChange.emit(dataUrl);
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Upload failed.';
    }
  }
}
