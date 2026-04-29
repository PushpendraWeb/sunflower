import { Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { BlogComponent } from './user/blog/blog.component';
import { BlogDetailsComponent } from './user/blog-details/blog-details.component';
import { LoginComponent } from './Admin/login/login.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogDetailsComponent },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
