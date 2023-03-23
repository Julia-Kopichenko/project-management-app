import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { RoutesPath } from '@app/shared/models/enams/routes-path';
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
    const userId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.userId
    );

    if (userId) {
      this.currentUserId = userId;
    }
  }

  updateUser(user: SingUpData): void {
    this.setCurrentUserId();

    this.userDataService.updateUser(this.currentUserId, user).subscribe({
      next: (data) => {
        this.loginService.userLogin$.next(data.login);
        this.notificationService.showSuccess('successMessage.editProfile');
        this.router.navigate([RoutesPath.mainPage]);
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
