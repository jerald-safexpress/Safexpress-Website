import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ADMIN_ICONS, iconLabel } from './admin-icons';

@Component({
  selector: 'app-admin-icon-picker',
  imports: [FormsModule],
  template: `
    <div class="admin-icon-picker">
      <span class="admin-icon-picker-label">{{ label }}</span>
      <div class="admin-icon-current">
        <span class="admin-icon-preview" aria-hidden="true"><i [class]="value || 'fa-solid fa-circle-question'"></i></span>
        <div>
          <strong>{{ currentLabel }}</strong>
          <small>{{ value || 'No icon selected' }}</small>
        </div>
      </div>

      <div class="admin-icon-grid" role="listbox" [attr.aria-label]="label">
        @for (icon of icons; track icon.value) {
          <button
            type="button"
            class="admin-icon-option"
            role="option"
            [class.on]="value === icon.value"
            [attr.aria-selected]="value === icon.value"
            (click)="pick(icon.value)"
          >
            <i [class]="icon.value" aria-hidden="true"></i>
            <span>{{ icon.label }}</span>
          </button>
        }
      </div>

      <label class="admin-field">
        <span>Or custom Font Awesome class</span>
        <input
          [ngModel]="value"
          (ngModelChange)="onCustom($event)"
          [name]="name"
          placeholder="e.g. fa-solid fa-truck"
        />
      </label>
    </div>
  `
})
export class AdminIconPickerComponent {
  @Input() label = 'Icon';
  @Input() value = '';
  @Input() name = 'icon';
  @Output() valueChange = new EventEmitter<string>();

  icons = ADMIN_ICONS;

  get currentLabel() {
    return iconLabel(this.value);
  }

  pick(value: string) {
    this.valueChange.emit(value);
  }

  onCustom(value: string) {
    this.valueChange.emit(value);
  }
}
