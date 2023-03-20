import { Injectable } from '@angular/core';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import { Board, BoardBodyForRequest } from '@interfaces/board-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

  getAllBoards(): Observable<Board[]> {
    return this.requestBuilderService.get<Board[]>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}`
    );
  }

  createBoard(data: BoardBodyForRequest): Observable<Board> {
    return this.requestBuilderService.post<Board>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}`,
      data
    );
  }

  deleteBoard(boardId: string): Observable<unknown> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}`;
    return this.requestBuilderService.delete<unknown>(url);
  }
}

// "http://localhost:3000/boards"
