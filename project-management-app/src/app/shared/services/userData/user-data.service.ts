import { Injectable } from '@angular/core';
import { UrlsEnum } from '@app/shared/models/enams/urls-enams';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '../requestBuilder/request-builder.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

  deleteUser(UserId: string): Observable<unknown> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.users}/${UserId}`;

    return this.requestBuilderService.delete(url);
  }
}
