import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();
  public toast$ = this.toastSubject.asObservable();

  showSuccess(title: string, message: string, duration: number = 5000) {
    this.showToast({ title, message, type: 'success', duration });
  }

  showError(title: string, message: string, duration: number = 5000) {
    this.showToast({ title, message, type: 'error', duration });
  }

  showWarning(title: string, message: string, duration: number = 5000) {
    this.showToast({ title, message, type: 'warning', duration });
  }

  showInfo(title: string, message: string, duration: number = 5000) {
    this.showToast({ title, message, type: 'info', duration });
  }

  private showToast(toast: ToastMessage) {
    this.toastSubject.next(toast);
  }
}
