import { Injectable } from '@angular/core';
import { UrlsEnum } from '@app/shared/models/enams/urls-enams';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '../requestBuilder/request-builder.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnDataService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

  getAllColumns(boardId: string): Observable<Column[]> {
    return this.requestBuilderService.get<Column[]>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}`
    );
  }
}
