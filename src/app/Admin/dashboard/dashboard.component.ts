import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { APIConstants } from '../../service/apiconstants';

type TimingRow = {
  docterName?: string;
  cityName?: string;
  day?: string;
  morningTime?: string;
  evningTime?: string;
};

type ReviewRow = {
  review_id?: number;
  name?: string;
  rating?: number;
  reward?: string;
  status?: boolean;
};

type EnquiryRow = {
  enquiry_id?: number;
  name?: string;
  mobileNo?: number | string;
  subject?: string;
  status?: boolean;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly baseService = inject(BaseService);
  private readonly router = inject(Router);
  private refreshTimer: ReturnType<typeof setInterval> | null = null;

  timings: TimingRow[] = [];
  reviews: ReviewRow[] = [];
  enquiries: EnquiryRow[] = [];
  isLoading = false;
  timingSearch = '';
  reviewSearch = '';
  enquirySearch = '';

  ngOnInit(): void {
    this.baseService.GetAuth(APIConstants.CheckAuth).subscribe({
      next: () => {
        this.loadDashboardData();
        this.refreshTimer = setInterval(() => this.loadDashboardData(), 15000);
      },
      error: (err) => {
        this.baseService.Error(err);
        if (err?.status === 401 || err?.status === 403) {
          this.router.navigateByUrl('/admin/login');
        }
      },
    });
  }

  ngOnDestroy(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  loadDashboardData(): void {
    this.isLoading = true;

    this.baseService.GetAuth(APIConstants.DocterTimingsGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.timings = Array.isArray(data) ? data : [];
      },
      error: (err) => this.baseService.Error(err),
    });

    this.baseService.GetAuth(APIConstants.ReviewsGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.reviews = Array.isArray(data) ? data : [];
      },
      error: (err) => this.baseService.Error(err),
    });

    this.baseService.GetAuth(APIConstants.EnquiryGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.enquiries = Array.isArray(data) ? data : [];
      },
      error: (err) => this.baseService.Error(err),
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  get filteredTimings(): TimingRow[] {
    const q = this.timingSearch.trim().toLowerCase();
    if (!q) return this.timings;
    return this.timings.filter(
      (t) =>
        String(t.docterName ?? '').toLowerCase().includes(q) ||
        String(t.cityName ?? '').toLowerCase().includes(q) ||
        String(t.day ?? '').toLowerCase().includes(q) ||
        String(t.morningTime ?? '').toLowerCase().includes(q) ||
        String(t.evningTime ?? '').toLowerCase().includes(q)
    );
  }

  get filteredReviews(): ReviewRow[] {
    const q = this.reviewSearch.trim().toLowerCase();
    if (!q) return this.reviews;
    return this.reviews.filter(
      (r) =>
        String(r.review_id ?? '').toLowerCase().includes(q) ||
        String(r.name ?? '').toLowerCase().includes(q) ||
        String(r.rating ?? '').toLowerCase().includes(q) ||
        String(r.reward ?? '').toLowerCase().includes(q) ||
        String(r.status ? 'active' : 'inactive').includes(q)
    );
  }

  get filteredEnquiries(): EnquiryRow[] {
    const q = this.enquirySearch.trim().toLowerCase();
    if (!q) return this.enquiries;
    return this.enquiries.filter(
      (e) =>
        String(e.enquiry_id ?? '').toLowerCase().includes(q) ||
        String(e.name ?? '').toLowerCase().includes(q) ||
        String(e.mobileNo ?? '').toLowerCase().includes(q) ||
        String(e.subject ?? '').toLowerCase().includes(q) ||
        String(e.status ? 'active' : 'inactive').includes(q)
    );
  }
}
