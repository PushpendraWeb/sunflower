import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  isAdminLoggedIn = false;
  isOnAdminRoute = false;

  constructor() {
    this.refreshAuthState();

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.refreshAuthState());

    window.addEventListener('storage', this.onStorageChange);
  }

  private readonly onStorageChange = (e: StorageEvent) => {
    if (e.key === 'admin_logged_in') this.refreshAuthState();
  };

  private refreshAuthState(): void {
    const path = this.router.url.split('?')[0].split('#')[0];
    this.isOnAdminRoute = path.startsWith('/admin');
    this.isAdminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
  }

  /** In-page nav without putting #section in the address bar (keeps href for scrollspy CSS). */
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const path = this.router.url.split('?')[0].split('#')[0];
    const onHome = path === '/' || path === '';

    const scroll = () => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (onHome) {
      scroll();
      history.replaceState(null, '', '/');
    } else {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(scroll, 150);
      });
    }
  }

  logout(event: Event): void {
    event.preventDefault();
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('AuthData');
    this.refreshAuthState();
    this.router.navigateByUrl('/admin/login');
  }
}
