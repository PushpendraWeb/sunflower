import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { APIConstants } from '../../service/apiconstants';

type EnquiryRow = {
  enquiry_id: number;
  name: string;
  mobileNo: number | string;
  email: string;
  user_img?: string;
  subject: string;
  enquiry_details: string;
  status?: boolean;
};

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent implements OnInit {
  private readonly baseService = inject(BaseService);
  private readonly router = inject(Router);
  enquiries: EnquiryRow[] = [];
  searchQuery = '';
  isLoading = false;
  isSubmitting = false;
  editingId: number | null = null;

  formModel: EnquiryRow = {
    enquiry_id: 0,
    name: '',
    mobileNo: '',
    email: '',
    user_img: '',
    subject: '',
    enquiry_details: '',
    status: true,
  };

  ngOnInit(): void {
    this.baseService.GetAuth(APIConstants.CheckAuth).subscribe({
      next: () => this.loadEnquiries(),
      error: (err) => {
        this.baseService.Error(err);
        if (err?.status === 401 || err?.status === 403) {
          this.router.navigateByUrl('/admin/login');
        }
      },
    });
  }

  loadEnquiries(): void {
    this.isLoading = true;
    this.baseService.GetAuth(APIConstants.EnquiryGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.enquiries = Array.isArray(data) ? data : [];
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isLoading = false),
    });
  }

  startEdit(row: EnquiryRow): void {
    this.baseService.GetAuth(`${APIConstants.EnquiryGetById}/${row.enquiry_id}`).subscribe({
      next: (res: any) => {
        const data = (res?.data ?? res ?? {}) as EnquiryRow;
        this.editingId = row.enquiry_id;
        this.formModel = {
          enquiry_id: data.enquiry_id ?? row.enquiry_id,
          name: data.name ?? '',
          mobileNo: data.mobileNo ?? '',
          email: data.email ?? '',
          user_img: data.user_img ?? '',
          subject: data.subject ?? '',
          enquiry_details: data.enquiry_details ?? '',
          status: data.status ?? true,
        };
      },
      error: (err) => this.baseService.Error(err),
    });
  }

  submitUpdate(): void {
    if (!this.editingId) return;
    this.isSubmitting = true;

    const payload = {
      name: this.formModel.name,
      mobileNo: Number(this.formModel.mobileNo),
      email: this.formModel.email,
      user_img: this.formModel.user_img || '',
      subject: this.formModel.subject,
      enquiry_details: this.formModel.enquiry_details,
      status: Boolean(this.formModel.status),
    };

    this.baseService.PutAuth(`${APIConstants.EnquiryUpdate}/${this.editingId}`, payload).subscribe({
      next: () => {
        this.resetForm();
        this.loadEnquiries();
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isSubmitting = false),
    });
  }

  deleteEnquiry(row: EnquiryRow): void {
    if (!confirm('Delete this enquiry?')) return;
    this.baseService.Delete(`${APIConstants.EnquiryDelete}/${row.enquiry_id}`).subscribe({
      next: () => this.loadEnquiries(),
      error: (err) => this.baseService.Error(err),
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.formModel = {
      enquiry_id: 0,
      name: '',
      mobileNo: '',
      email: '',
      user_img: '',
      subject: '',
      enquiry_details: '',
      status: true,
    };
  }

  get filteredEnquiries(): EnquiryRow[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.enquiries;
    return this.enquiries.filter(
      (e) =>
        String(e.enquiry_id ?? '').toLowerCase().includes(q) ||
        String(e.name ?? '').toLowerCase().includes(q) ||
        String(e.mobileNo ?? '').toLowerCase().includes(q) ||
        String(e.email ?? '').toLowerCase().includes(q) ||
        String(e.subject ?? '').toLowerCase().includes(q) ||
        String(e.enquiry_details ?? '').toLowerCase().includes(q) ||
        String(e.status ? 'active' : 'inactive').includes(q)
    );
  }
}
