import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from './admin-auth.service';
import { ContentService } from '../content/content.service';

@Component({
  selector: 'app-admin-settings',
  imports: [FormsModule],
  template: `
    <div class="admin-page">
      <header class="admin-page-head">
        <div>
          <h1>Settings</h1>
          <p>Password, backup, and reset.</p>
        </div>
      </header>
      @if (message) { <p class="admin-toast">{{ message }}</p> }
      @if (error) { <p class="admin-error">{{ error }}</p> }

      <div class="admin-box">
        <h2 class="admin-sub" style="margin-top:0">Change password</h2>
        <div class="admin-grid-2">
          <label class="admin-field"><span>Current password</span><input type="password" [(ngModel)]="currentPassword" name="cur" /></label>
          <label class="admin-field"><span>New password</span><input type="password" [(ngModel)]="newPassword" name="next" /></label>
        </div>
        <button class="admin-btn" type="button" (click)="changePassword()">Update password</button>
      </div>

      <div class="admin-box">
        <h2 class="admin-sub" style="margin-top:0">Backup</h2>
        <p class="admin-muted">Download JSON to move content to another browser, or import a file here.</p>
        <div class="admin-actions">
          <button class="admin-btn" type="button" (click)="download()">Export JSON</button>
          <label class="admin-btn ghost file">
            Import JSON
            <input type="file" accept="application/json,.json" (change)="onFile($event)" hidden />
          </label>
        </div>
      </div>

      <div class="admin-box">
        <h2 class="admin-sub" style="margin-top:0">Reset</h2>
        <p class="admin-muted">Clears saved overrides and restores the defaults from the project content file.</p>
        <button class="admin-btn danger" type="button" (click)="reset()">Reset all content</button>
      </div>

      <div class="admin-box">
        <h2 class="admin-sub" style="margin-top:0">Preloader</h2>
        <label class="admin-check"><input type="checkbox" [(ngModel)]="showPreloader" name="pre" /> Show splash preloader</label>
        <label class="admin-field" style="max-width:220px"><span>Preloader duration (ms)</span><input type="number" [(ngModel)]="preloaderMs" name="ms" /></label>
        <button class="admin-btn" type="button" (click)="saveUi()">Save UI options</button>
      </div>
    </div>
  `
})
export class AdminSettingsComponent {
  private content = inject(ContentService);
  private auth = inject(AdminAuthService);
  currentPassword = '';
  newPassword = '';
  message = '';
  error = '';
  showPreloader = this.content.snapshot().ui.showPreloader;
  preloaderMs = this.content.snapshot().ui.preloaderMs;

  changePassword() {
    this.error = '';
    if (!this.auth.changePassword(this.currentPassword, this.newPassword)) {
      this.error = 'Could not change password. Check the current password (min 4 characters for the new one).';
      return;
    }
    this.message = 'Password updated.';
    this.currentPassword = '';
    this.newPassword = '';
  }

  download() {
    const blob = new Blob([this.content.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sfx-site-content.json';
    a.click();
    URL.revokeObjectURL(url);
    this.message = 'Export downloaded.';
  }

  onFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        this.content.importJson(String(reader.result || ''));
        this.message = 'Import complete.';
        this.error = '';
        const ui = this.content.snapshot().ui;
        this.showPreloader = ui.showPreloader;
        this.preloaderMs = ui.preloaderMs;
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Import failed.';
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  reset() {
    if (!confirm('Reset all content to project defaults?')) return;
    this.content.reset();
    const ui = this.content.snapshot().ui;
    this.showPreloader = ui.showPreloader;
    this.preloaderMs = ui.preloaderMs;
    this.message = 'Content reset to defaults.';
  }

  saveUi() {
    const draft = structuredClone(this.content.snapshot());
    draft.ui.showPreloader = this.showPreloader;
    draft.ui.preloaderMs = Number(this.preloaderMs) || 900;
    this.content.save(draft);
    this.message = 'UI options saved.';
  }
}
