import { Injectable } from '@angular/core';
import { UrlsEnum } from '@app/shared/models/enams/urls-enams';
import {
  Column,
  ColumnBodyForRequest,
} from '@app/shared/models/interfaces/column-interface';
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

  createColumn(
    boardId: string,
    data: ColumnBodyForRequest
  ): Observable<Column> {
    return this.requestBuilderService.post<Column>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}`,
      data
    );
  }

  deleteColumn(boardId: string, columnId: string): Observable<unknown> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}/${columnId}`;

    return this.requestBuilderService.delete<unknown>(url);
  }
}
