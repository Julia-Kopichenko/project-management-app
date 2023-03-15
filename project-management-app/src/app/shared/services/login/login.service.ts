import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '@app/shared/models/interfaces/auth-interface';
import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
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
    this.authService.logIn(userData).subscribe({
      next: (data) => {
        this.localStorageService.saveInLocalStorage(TOKEN_KEY, data.token);
        this.localStorageService.saveInLocalStorage(
          USER_KEY,
          JSON.stringify(data)
        );

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
}
