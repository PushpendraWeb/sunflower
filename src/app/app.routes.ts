import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { BlogComponent } from './user/blog/blog.component';
import { BlogDetailsComponent } from './user/blog-details/blog-details.component';
import { GalleryComponent } from './user/gallery/gallery.component';
import { LoginComponent } from './Admin/login/login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { DocterTimeingComponent } from './Admin/docter-timeing/docter-timeing.component';
import { DocterReviewsComponent } from './Admin/docter-reviews/docter-reviews.component';
import { EnquiryComponent } from './Admin/enquiry/enquiry.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailsComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/docter-timeing', component: DocterTimeingComponent },
  { path: 'admin/docter-reviews', component: DocterReviewsComponent },
  { path: 'admin/enquiry', component: EnquiryComponent },
  { path: '**', redirectTo: '' }
];
