import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import {
  SingUpData,
  LoginData,
  LoginResponse,
  UserData,
} from '@interfaces/auth-interface';
import { Router } from '@angular/router';
// import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
// FIXME -
// import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // FIXME -
  // helper = new JwtHelperService();

  constructor(
    private readonly requestBuilderService: RequestBuilderService,
    private readonly localStorageService: LocalStorageService,
    private router: Router
  ) {}

  // FIXME -
  // isLoggedIn() {
  //   const token = this.localStorageService.getFromLocalStorage(
  //     LocalStorageKeys.token
  //   );
  // }

  logIn(body: LoginData): Observable<LoginResponse> {
    return this.requestBuilderService.post(
      `${UrlsEnum.baseURL}/${UrlsEnum.logIn}`,
      body
    );
  }

  signUp(body: SingUpData): Observable<UserData> {
    return this.requestBuilderService.post(
      `${UrlsEnum.baseURL}/${UrlsEnum.signUp}`,
      body
    );
  }

  // FIXME -
  logOut(): void {
    this.localStorageService.clearLocalStorage();
    this.router.navigate(['/']);
  }
}
