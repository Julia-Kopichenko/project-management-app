import { Injectable } from '@angular/core';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import { Board } from '@interfaces/board-interface';
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

  createBoard(data: Board): Observable<Board> {
    return this.requestBuilderService.post<Board>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}`,
      data
    );
  }
}

// "http://localhost:3000/boards"
