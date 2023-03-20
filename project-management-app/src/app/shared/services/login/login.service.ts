import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData, Token } from '@app/shared/models/interfaces/auth-interface';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

const TOKEN_KEY = 'token';
// const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class LoginService implements OnDestroy {
  subscription: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly localStorageService: LocalStorageService,
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
        this.localStorageService.saveInLocalStorage(TOKEN_KEY, data.token);
        this.router.navigate(['/main']);
      },
      error: () => {
        // this.isLoginFailed = true;
        // this.errorMessage = err.error.message;
        // if (error.error.statusCode === 403) {
        //   this.notificationService.showError('errorHandling.loginError');
        // }
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
