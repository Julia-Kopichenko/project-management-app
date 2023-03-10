import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import {
  SingUpData,
  LoginData,
  LoginResponse,
  UserData,
} from '@app/shared/models/interfaces/auth-interface';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

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
}
