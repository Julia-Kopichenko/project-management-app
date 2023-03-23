import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { RoutesPath } from '@app/shared/models/enams/routes-path';
import { LoginData, Token } from '@app/shared/models/interfaces/auth-interface';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  private subscription: Subscription;

  isLoggedInStatus$ = new Subject<boolean>();

  userLogin$ = new Subject<string>();

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    const tokenFromLocalStorage = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.token
    );
    if (!tokenFromLocalStorage) {
      this.isLoggedInStatus$.next(false);
      return false;
    }
    this.isLoggedInStatus$.next(true);

    return true;
  }

  logIn(userData: LoginData): void {
    this.subscription = this.authService.logIn(userData).subscribe({
      next: (data: Token) => {
        const { id: userId, login } = this.getUserDataFromToken(data.token);

        this.userLogin$.next(login);

        this.localStorageService.saveInLocalStorage(
          LocalStorageKeys.token,
          data.token
        );
        this.localStorageService.saveInLocalStorage(
          LocalStorageKeys.userId,
          userId
        );
        this.router.navigate([RoutesPath.mainPage]);
      },
      error: (err) => {
        if (err.error.statusCode === 401) {
          this.notificationService.showError('errorMessage.authorizationError');
        } else {
          this.notificationService.showError('errorMessage.somethingWrong');
        }
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getUserDataFromToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  logOut(): void {
    this.userLogin$.next('');
    this.localStorageService.clearLocalStorage();
    this.router.navigate([RoutesPath.welcomePage]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
