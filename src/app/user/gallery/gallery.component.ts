import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  readonly images = Array.from({ length: 8 }, (_, index) => ({
    src: `/img/gallery/gallery-${index + 1}.jpg`,
    alt: `Sunflower Hospital gallery image ${index + 1}`,
  }));
}
