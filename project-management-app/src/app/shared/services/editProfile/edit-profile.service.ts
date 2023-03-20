import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

import { NotificationService } from '../notification/notification.service';
import { UserDataService } from '../userData/user-data.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  public currentUserId: string;

  constructor(
    private readonly userDataService: UserDataService,
    private readonly localStorageService: LocalStorageService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {}

  setCurrentUserId(): void {
    const userId = this.localStorageService.getFromLocalStorage('userId');

    if (userId) {
      this.currentUserId = userId;
    }
  }

  deleteUser() {
    this.setCurrentUserId();

    this.userDataService.deleteUser(this.currentUserId).subscribe({
      next: () => this.authService.logOut(),
      error: () =>
        this.notificationService.showError('errorMessage.somethingWrong'),
    });
  }
}
