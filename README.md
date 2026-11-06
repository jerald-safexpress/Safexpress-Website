# SFX Logistics website

Angular logistics site with a public storefront and a browser admin panel for editing content.

## Admin panel

Open http://localhost:4200/admin

- Default password: `admin123`
- Change logo images, favicon, browser tab title, all site photos (hero, services, team, fleet, blog, banners), company name, phone, email, hero text, services, team, fleet, blog, FAQ, tracking samples, contact copy, and more
- Use **Colors & theme** (`/admin/theme`) for brand, accent text, button, heading, and body colors
- Use **Images / Media** (`/admin/media`) to upload or replace every picture in one screen
- Use **Inbox** (`/admin/inbox`) to read Contact and Quote form submissions from the public site

- Content and inbox saves stay in this browser (`localStorage`)
- Forms do not email a server yet — open admin on the same browser (or machine profile) that received the submission
- Export / import JSON under **Settings** to move content between machines
- **Reset** restores defaults from `src/app/content/site.content.ts`

## Run

```bash
npm start
```

Open http://localhost:4200/

Sample tracking IDs: `SFX-24081`, `SFX-24092`, `SFX-24110`.

## Defaults file

Factory content lives in `src/app/content/site.content.ts`. Prefer `/admin` for day-to-day edits. Theme colors live under `ui` (`brandColor`, `accentTextColor`, `buttonBg`, `buttonText`, etc.).

## Build

```bash
npm run build
```
