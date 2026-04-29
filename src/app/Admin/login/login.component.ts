import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from '../../service/BaseService.service';
import { ToastService } from '../../service/toast.service';
import { Constants } from '../../service/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly baseService = inject(BaseService);
  private readonly toast = inject(ToastService);

  mobile = '';
  password = '';

  isSubmitting = false;

  showResetPopup = false;
  resetMobile = '';
  oldPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  isResetSubmitting = false;

  onSubmit(event: Event): void {
    event.preventDefault();

    const mobileNum = Number(this.mobile);
    if (!Number.isFinite(mobileNum) || this.mobile.trim().length < 8) {
      this.toast.showError('Invalid mobile', 'Please enter a valid mobile number.');
      return;
    }
    if (!this.password || this.password.trim().length < 3) {
      this.toast.showError('Invalid password', 'Please enter your password.');
      return;
    }

    this.isSubmitting = true;
    this.baseService.LoginWithMobilePassword(mobileNum, this.password.trim()).subscribe({
      next: (res: any) => {
        const payload = res?.data ?? res;
        const looksSuccessful =
          res?.success === true ||
          res?.status === true ||
          Boolean(payload?.access_token || payload?.AccessToken || payload?.token);

        if (!looksSuccessful) {
          this.isSubmitting = false;
          const msg = res?.message || payload?.message || res?.err || payload?.err || 'Invalid credentials.';
          this.toast.showError('Login failed', msg);
          return;
        }

        // store for existing code paths that read Constants.AuthData
        localStorage.setItem(Constants.AuthData, JSON.stringify(payload ?? {}));
        localStorage.setItem('admin_logged_in', 'true');
        this.toast.showSuccess('Login successful', 'Welcome back!');
        this.router.navigateByUrl('/admin/dashboard');
      },
      error: (err) => {
        this.isSubmitting = false;
        // BaseService.Error already shows toast + routing for common cases.
        this.baseService.Error(err);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  openResetPopup(): void {
    this.showResetPopup = true;
    this.resetMobile = this.mobile || '';
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }

  closeResetPopup(): void {
    this.showResetPopup = false;
  }

  onResetSubmit(event: Event): void {
    event.preventDefault();

    const mobileNum = Number(this.resetMobile);
    if (!Number.isFinite(mobileNum) || this.resetMobile.trim().length < 8) {
      this.toast.showError('Invalid mobile', 'Please enter a valid mobile number.');
      return;
    }
    if (!this.oldPassword || this.oldPassword.trim().length < 3) {
      this.toast.showError('Invalid old password', 'Please enter old password.');
      return;
    }
    if (!this.newPassword || this.newPassword.trim().length < 6) {
      this.toast.showError('Weak password', 'New password must be at least 6 characters.');
      return;
    }
    if (this.newPassword !== this.confirmNewPassword) {
      this.toast.showError('Password mismatch', 'New password and confirm password must match.');
      return;
    }

    this.isResetSubmitting = true;
    this.baseService.ResetPassword(mobileNum, this.newPassword, { old_password: this.oldPassword }).subscribe({
      next: () => {
        this.toast.showSuccess('Password updated', 'You can login with your new password.');
        this.closeResetPopup();
      },
      error: (err) => {
        this.isResetSubmitting = false;
        // BaseService.Error already shows toast + routing for common cases.
        this.baseService.Error(err);
      },
      complete: () => {
        this.isResetSubmitting = false;
      },
    });
  }
}
