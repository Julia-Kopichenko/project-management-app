import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import {User} from '@app/shared/models/interfaces/user-interface'

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

  signUp(body: User): Observable<User | Error> {
    return this.requestBuilderService.post(UrlsEnum.signUp, body);
  }
}
