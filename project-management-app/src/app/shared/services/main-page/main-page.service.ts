/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { AddBoardEvent, Board } from '@interfaces/board-interface';
import { BehaviorSubject } from 'rxjs';
import { BoardsService } from '../boards/boards.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private allBoards$ = new BehaviorSubject<Board[]>([]);

  constructor(
    private readonly boardsDataService: BoardsService,
    private readonly localStorageService: LocalStorageService
  ) {}

  getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (boards: Board[]) => {
        this.allBoards$.next(boards);
      },
      error: () => {},
    });
  }

  getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  createBoard(event: AddBoardEvent) {
    const idFromLocalStorage =
      this.localStorageService.getFromLocalStorage('userId');

    const val = {
      title: event.value.title,
      owner: idFromLocalStorage,
      users: ['string'],
    };

    this.boardsDataService.createBoard(val).subscribe({
      next: () => {
        this.boardsDataService.getAllBoards().subscribe({
          next: (item: Board[]) => {
            this.allBoards$.next(item);
          },
          error: () => {},
        });
      },
      error: () => {},
    });
  }
}
