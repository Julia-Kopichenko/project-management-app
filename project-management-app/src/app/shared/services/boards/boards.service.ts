import { Injectable } from '@angular/core';
import { RequestBuilderService } from '@services/requestBuilder/request-builder.service';
import { UrlsEnum } from '@enams/urls-enams';
import { AllBoardsResponse } from '@interfaces/board-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {

  constructor(private readonly requestBuilderService: RequestBuilderService) { }


  // getAllBoards(): Observable<AllBoardsResponse> {
  //   return this.requestBuilderService.get<AllBoardsResponse>("http://localhost:3000/boards");
  // }
  getAllBoards(): Observable<AllBoardsResponse> {
    return this.requestBuilderService.get<AllBoardsResponse>(
      `${UrlsEnum.baseURL}/${UrlsEnum.boards}`
    );
  }
}
