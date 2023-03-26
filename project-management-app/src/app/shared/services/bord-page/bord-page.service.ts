import { Injectable } from '@angular/core';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BordPageService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  getCurrentBoardId() {
    const board = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardId
    ) as string;
    return board;
  }
}
