import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private readonly router = inject(Router);

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
}
