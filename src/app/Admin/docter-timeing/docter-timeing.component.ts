import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { APIConstants } from '../../service/apiconstants';
import { ToastService } from '../../service/toast.service';

type DocterTimingRow = {
  docterTimings_id?: number;
  id?: number;
  docterName: string;
  cityName: string;
  location?: string;
  day: string;
  morningTime: string;
  evningTime: string;
  status: boolean;
};

@Component({
  selector: 'app-docter-timeing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './docter-timeing.component.html',
  styleUrl: './docter-timeing.component.css'
})
export class DocterTimeingComponent implements OnInit {
  private readonly baseService = inject(BaseService);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  readonly daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  readonly defaultMorningTime = '10:00 AM - 01:00 PM';
  readonly defaultEveningTime = '05:00 PM - 08:00 PM';

  timings: DocterTimingRow[] = [];
  searchQuery = '';
  isLoading = false;
  isSubmitting = false;
  editingId: number | null = null;

  formModel: DocterTimingRow = {
    docterName: 'Dr. Jayesh Prabhakar Waghulde',
    cityName: '',
    location: '',
    day: 'Monday',
    morningTime: this.defaultMorningTime,
    evningTime: this.defaultEveningTime,
    status: true,
  };

  ngOnInit(): void {
    debugger;
    this.baseService.GetAuth(APIConstants.CheckAuth).subscribe({
      next: () =>   
        this.loadAllTimings(),
      error: (err) => {
        this.baseService.Error(err);
        if (err?.status === 401 || err?.status === 403) {
          this.router.navigateByUrl('/admin/login');
        }
      },
    });
  }

  loadAllTimings(): void {
    this.isLoading = true;
    this.baseService.GetAuth(APIConstants.DocterTimingsGetAll).subscribe({
      next: (res: any) => {
        const data = res?.data ?? res ?? [];
        this.timings = Array.isArray(data) ? data : [];
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isLoading = false),
    });
  }

  onSubmit(): void {
    if (
      !this.formModel.docterName.trim() ||
      !this.formModel.cityName.trim() ||
      !this.formModel.day.trim() ||
      !String(this.formModel.location ?? '').trim()
    ) {
      this.toast.showError('Validation', 'Doctor name, city, location and day are required.');
      return;
    }

    const payload = {
      docterName: this.formModel.docterName.trim(),
      cityName: this.formModel.cityName.trim(),
      location: String(this.formModel.location ?? '').trim(),
      day: this.formModel.day.trim(),
      morningTime: this.formModel.morningTime.trim() || this.defaultMorningTime,
      evningTime: this.formModel.evningTime.trim() || this.defaultEveningTime,
      status: Boolean(this.formModel.status),
    };

    this.isSubmitting = true;

    if (this.editingId) {
      this.baseService
        .PutAuth(`${APIConstants.DocterTimingsUpdate}/${this.editingId}`, payload)
        .subscribe({
          next: () => {
            this.toast.showSuccess('Updated', 'Doctor timing updated successfully.');
            this.resetForm();
            this.loadAllTimings();
          },
          error: (err) => this.baseService.Error(err),
          complete: () => (this.isSubmitting = false),
        });
      return;
    }

    this.baseService.PostAuth(APIConstants.DocterTimingsCreate, payload).subscribe({
      next: () => {
        this.toast.showSuccess('Created', 'Doctor timing created successfully.');
        this.resetForm();
        this.loadAllTimings();
      },
      error: (err) => this.baseService.Error(err),
      complete: () => (this.isSubmitting = false),
    });
  }

  onEdit(row: DocterTimingRow): void {
    const id = this.getRowId(row);
    if (!id) return;

    this.baseService.GetAuth(`${APIConstants.DocterTimingsGetById}/${id}`).subscribe({
      next: (res: any) => {
        const data = (res?.data ?? res ?? {}) as DocterTimingRow;
        this.editingId = id;
        this.formModel = {
          docterName: data.docterName ?? '',
          cityName: data.cityName ?? '',
          location: (data as any)?.location ?? '',
          day: data.day ?? '',
          morningTime: data.morningTime ?? '',
          evningTime: data.evningTime ?? '',
          status: Boolean(data.status),
        };
      },
      error: (err) => this.baseService.Error(err),
    });
  }

  onDelete(row: DocterTimingRow): void {
    const id = this.getRowId(row);
    if (!id) return;
    if (!confirm('Delete this timing?')) return;

    this.baseService.Delete(`${APIConstants.DocterTimingsDelete}/${id}`).subscribe({
      next: () => {
        this.toast.showSuccess('Deleted', 'Doctor timing deleted successfully.');
        this.loadAllTimings();
      },
      error: (err) => this.baseService.Error(err),
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.formModel = {
      docterName: 'Dr. Jayesh Prabhakar Waghulde',
      cityName: '',
      location: '',
      day: 'Monday',
      morningTime: this.defaultMorningTime,
      evningTime: this.defaultEveningTime,
      status: true,
    };
  }

  getRowId(row: DocterTimingRow): number | null {
    return Number(row?.docterTimings_id ?? row?.id) || null;
  }

  get filteredTimings(): DocterTimingRow[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.timings;
    return this.timings.filter(
      (row) =>
        String(row.docterName ?? '').toLowerCase().includes(q) ||
        String(row.cityName ?? '').toLowerCase().includes(q) ||
        String(row.location ?? '').toLowerCase().includes(q) ||
        String(row.day ?? '').toLowerCase().includes(q) ||
        String(row.morningTime ?? '').toLowerCase().includes(q) ||
        String(row.evningTime ?? '').toLowerCase().includes(q) ||
        String(row.status ? 'active' : 'inactive').includes(q)
    );
  }
}
