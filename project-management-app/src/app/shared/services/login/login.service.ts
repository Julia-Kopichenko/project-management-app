import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData, Token } from '@app/shared/models/interfaces/auth-interface';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  isLoggedInStatus$ = new Subject<boolean>();

  isLoggedIn(): Observable<boolean> {
    const tokenFromLocalStorage =
      this.localStorageService.getFromLocalStorage(TOKEN_KEY);
    if (!tokenFromLocalStorage) {
      this.isLoggedInStatus$.next(false);

      return of(false);
    }

    this.isLoggedInStatus$.next(true);
    return of(true);
  }

  logIn(userData: LoginData) {
    this.subscription = this.authService.logIn(userData).subscribe({
      next: (data: Token) => {
        const userId = this.getUserIdFromToken(data.token);

        this.localStorageService.saveInLocalStorage(TOKEN_KEY, data.token);
        this.localStorageService.saveInLocalStorage('userId', userId);
        this.router.navigate(['/main']);
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
  getUserIdFromToken(token: string): string {
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

    return JSON.parse(jsonPayload).id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
