import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { APIConstants } from '../../service/apiconstants';

type ReviewRow = {
  review_id: number;
  name: string;
  mobileNo: number | string;
  email: string;
  rating: number;
  review_details: string;
  reward?: string;
  accepted_reward?: boolean;
  status?: boolean;
  rewardDraft?: string;
  acceptedRewardDraft?: boolean;
};

@Component({
  selector: 'app-docter-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docter-reviews.component.html',
  styleUrl: './docter-reviews.component.css'
})
export class DocterReviewsComponent implements OnInit {
  private readonly baseService = inject(BaseService);
  private readonly router = inject(Router);
  reviews: ReviewRow[] = [];
  searchQuery = '';
  isLoading = false;
  isSubmitting = false;
  editingId: number | null = null;
  rewardModalOpen = false;
  rewardTarget: ReviewRow | null = null;

  formModel: ReviewRow = {
    review_id: 0,
    name: '',
    mobileNo: '',
    email: '',
    rating: 5,
    review_details: '',
    reward: '',
    accepted_reward: false,
    status: true,
  };

  ngOnInit(): void {
    this.baseService.GetAuth(APIConstants.CheckAuth).subscribe({
      next: () => this.loadReviews(),
      error: (err) => {
        this.baseService.Error(err);
        if (err?.status === 401 || err?.status === 403) {
          this.router.navigateByUrl('/admin/login');
        }
      },
    });
  }

  loadReviews(): void {
    this.isLoading = true;
    this.baseService.GetAuth(APIConstants.ReviewsGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.reviews = Array.isArray(data)
          ? data.map((item: ReviewRow) => ({
              ...item,
              rewardDraft: item.reward ?? '',
              acceptedRewardDraft: Boolean(item.accepted_reward),
            }))
          : [];
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isLoading = false),
    });
  }

  startEdit(row: ReviewRow): void {
    this.baseService.GetAuth(`${APIConstants.ReviewsGetById}/${row.review_id}`).subscribe({
      next: (res: any) => {
        const data = (res?.data ?? res ?? {}) as ReviewRow;
        this.editingId = row.review_id;
        this.formModel = {
          review_id: data.review_id ?? row.review_id,
          name: data.name ?? '',
          mobileNo: data.mobileNo ?? '',
          email: data.email ?? '',
          rating: Number(data.rating ?? 5),
          review_details: data.review_details ?? '',
          reward: data.reward ?? '',
          accepted_reward: Boolean(data.accepted_reward),
          status: data.status ?? true,
        };
      },
      error: (err) => this.baseService.Error(err),
    });
  }

  openRewardModal(row: ReviewRow): void {
    this.rewardTarget = {
      ...row,
      rewardDraft: row.reward ?? '',
      acceptedRewardDraft: Boolean(row.accepted_reward),
    };
    this.rewardModalOpen = true;
  }

  closeRewardModal(): void {
    this.rewardModalOpen = false;
    this.rewardTarget = null;
  }

  submitUpdate(): void {
    if (!this.editingId) return;
    this.isSubmitting = true;

    const payload = {
      name: this.formModel.name,
      mobileNo: Number(this.formModel.mobileNo),
      email: this.formModel.email,
      rating: Number(this.formModel.rating),
      review_details: this.formModel.review_details,
      reward: this.formModel.reward || '',
      accepted_reward: Boolean(this.formModel.accepted_reward),
      status: Boolean(this.formModel.status),
    };

    this.baseService.PutAuth(`${APIConstants.ReviewsUpdate}/${this.editingId}`, payload).subscribe({
      next: () => {
        this.resetForm();
        this.loadReviews();
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isSubmitting = false),
    });
  }

  updateReward(): void {
    if (!this.rewardTarget) return;
    const payload = {
      reward: this.rewardTarget.rewardDraft || '',
      accepted_reward: Boolean(this.rewardTarget.acceptedRewardDraft),
    };
    this.baseService.PatchAuth(`${APIConstants.ReviewsUpdateReward}/${this.rewardTarget.review_id}`, payload).subscribe({
      next: () => {
        this.closeRewardModal();
        this.loadReviews();
      },
      error: (err) => this.baseService.Error(err),
    });
  }

  updateStatus(row: ReviewRow): void {
    const nextStatus = !row.status;
    this.baseService.PatchAuth(`${APIConstants.ReviewsUpdateStatus}/${row.review_id}`, { status: nextStatus }).subscribe({
      next: () => this.loadReviews(),
      error: (err) => this.baseService.Error(err),
    });
  }

  deleteReview(row: ReviewRow): void {
    if (!confirm('Delete this review?')) return;
    this.baseService.Delete(`${APIConstants.ReviewsDelete}/${row.review_id}`).subscribe({
      next: () => this.loadReviews(),
      error: (err) => this.baseService.Error(err),
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.formModel = {
      review_id: 0,
      name: '',
      mobileNo: '',
      email: '',
      rating: 5,
      review_details: '',
      reward: '',
      accepted_reward: false,
      status: true,
    };
  }

  get filteredReviews(): ReviewRow[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.reviews;
    return this.reviews.filter(
      (r) =>
        String(r.review_id ?? '').toLowerCase().includes(q) ||
        String(r.name ?? '').toLowerCase().includes(q) ||
        String(r.mobileNo ?? '').toLowerCase().includes(q) ||
        String(r.email ?? '').toLowerCase().includes(q) ||
        String(r.review_details ?? '').toLowerCase().includes(q) ||
        String(r.reward ?? '').toLowerCase().includes(q) ||
        String(r.status ? 'active' : 'inactive').includes(q)
    );
  }
}
