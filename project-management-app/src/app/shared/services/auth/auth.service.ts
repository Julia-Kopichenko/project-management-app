import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import {
  SingUpData,
  LoginData,
  LoginResponse,
  UserData,
} from '@app/shared/models/interfaces/auth-interface';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private readonly requestBuilderService: RequestBuilderService,
    private readonly localStorageService: LocalStorageService,
    private router: Router
  ) {}

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

  logOut(): void {
    this.localStorageService.clearLocalStorage()
    this.router.navigate(['/']);
  }
}
