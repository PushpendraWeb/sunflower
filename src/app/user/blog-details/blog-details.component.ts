import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogDataService } from '../blog/blog-data.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly blogData = inject(BlogDataService);

  readonly slug = this.route.snapshot.paramMap.get('slug');
  readonly post = this.blogData.findBySlug(this.slug);

  trackByIndex(index: number): number {
    return index;
  }
}
