import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SingUpData } from '@app/shared/models/interfaces/auth-interface';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { LoginService } from '../login/login.service';

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
    private readonly loginService: LoginService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  setCurrentUserId(): void {
    const userId = this.localStorageService.getFromLocalStorage('userId');

    if (userId) {
      this.currentUserId = userId;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  updateUser(user: SingUpData): void {
    const newUser: SingUpData = user;
    this.setCurrentUserId();

    this.userDataService.updateUser(this.currentUserId, newUser).subscribe({
      next: () => {
        this.notificationService.showSuccess('successMessage.editProfile');
        this.router.navigate(['/main']);
      },
      error: () =>
        this.notificationService.showError('errorMessage.somethingWrong'),
    });
  }

  deleteUser(): void {
    this.setCurrentUserId();

    this.userDataService.deleteUser(this.currentUserId).subscribe({
      next: () => this.loginService.logOut(),
      error: () =>
        this.notificationService.showError('errorMessage.somethingWrong'),
    });
  }
}
