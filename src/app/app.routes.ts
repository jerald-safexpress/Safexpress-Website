import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { ServicesComponent } from './pages/services.component';
import { ServiceDetailComponent } from './pages/service-detail.component';
import { TrackingComponent } from './pages/tracking.component';
import { AboutComponent } from './pages/about.component';
import { FleetComponent } from './pages/fleet.component';
import { TeamComponent } from './pages/team.component';
import { CareersComponent } from './pages/careers.component';
import { FaqPageComponent } from './pages/faq-page.component';
import { BlogComponent } from './pages/blog.component';
import { BlogDetailComponent } from './pages/blog-detail.component';
import { ContactComponent } from './pages/contact.component';
import { QuoteComponent } from './pages/quote.component';
import { LegalComponent } from './pages/legal.component';
import { NotFoundComponent } from './pages/not-found.component';
import { adminGuard, adminGuestGuard } from './admin/admin.guard';
import { AdminLoginComponent } from './admin/admin-login.component';
import { AdminShellComponent } from './admin/admin-shell.component';
import { AdminOverviewComponent } from './admin/admin-overview.component';
import { AdminCompanyComponent } from './admin/admin-company.component';
import { AdminHeroComponent } from './admin/admin-hero.component';
import { AdminServicesComponent } from './admin/admin-services.component';
import { AdminPeopleComponent } from './admin/admin-people.component';
import { AdminContentComponent } from './admin/admin-content.component';
import { AdminTrackingComponent } from './admin/admin-tracking.component';
import { AdminContactComponent } from './admin/admin-contact.component';
import { AdminSettingsComponent } from './admin/admin-settings.component';
import { AdminMediaComponent } from './admin/admin-media.component';
import { AdminThemeComponent } from './admin/admin-theme.component';
import { AdminInboxComponent } from './admin/admin-inbox.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home', overlay: true } },
  { path: 'services', component: ServicesComponent, data: { title: 'Services' } },
  { path: 'services/:slug', component: ServiceDetailComponent, data: { title: 'Service' } },
  { path: 'tracking', component: TrackingComponent, data: { title: 'Track Shipment' } },
  { path: 'about', component: AboutComponent, data: { title: 'About Us' } },
  { path: 'fleet', component: FleetComponent, data: { title: 'Our Fleet' } },
  { path: 'team', component: TeamComponent, data: { title: 'Our Team' } },
  { path: 'careers', component: CareersComponent, data: { title: 'Careers' } },
  { path: 'faq', component: FaqPageComponent, data: { title: 'FAQ' } },
  { path: 'blog', component: BlogComponent, data: { title: 'Blog' } },
  { path: 'blog/:slug', component: BlogDetailComponent, data: { title: 'Article' } },
  { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
  { path: 'quote', component: QuoteComponent, data: { title: 'Get a Quote' } },
  { path: 'privacy', component: LegalComponent, data: { title: 'Privacy Policy', page: 'privacy' } },
  { path: 'terms', component: LegalComponent, data: { title: 'Terms of Service', page: 'terms' } },
  {
    path: 'admin/login',
    component: AdminLoginComponent,
    canActivate: [adminGuestGuard],
    data: { title: 'Admin Login', chrome: false }
  },
  {
    path: 'admin',
    component: AdminShellComponent,
    canActivate: [adminGuard],
    data: { title: 'Admin', chrome: false },
    children: [
      { path: '', component: AdminOverviewComponent, data: { title: 'Admin' } },
      { path: 'inbox', component: AdminInboxComponent, data: { title: 'Admin Inbox' } },
      { path: 'company', component: AdminCompanyComponent, data: { title: 'Admin Company' } },
      { path: 'theme', component: AdminThemeComponent, data: { title: 'Admin Colors' } },
      { path: 'media', component: AdminMediaComponent, data: { title: 'Admin Images' } },
      { path: 'hero', component: AdminHeroComponent, data: { title: 'Admin Home' } },
      { path: 'services', component: AdminServicesComponent, data: { title: 'Admin Services' } },
      { path: 'people', component: AdminPeopleComponent, data: { title: 'Admin Team' } },
      { path: 'content', component: AdminContentComponent, data: { title: 'Admin Content' } },
      { path: 'tracking', component: AdminTrackingComponent, data: { title: 'Admin Tracking' } },
      { path: 'contact', component: AdminContactComponent, data: { title: 'Admin Contact' } },
      { path: 'settings', component: AdminSettingsComponent, data: { title: 'Admin Settings' } }
    ]
  },
  { path: '**', component: NotFoundComponent, data: { title: 'Page not found' } }
];
