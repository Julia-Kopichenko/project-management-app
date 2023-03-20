/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable, OnDestroy } from '@angular/core';
import {
  AddBoardEvent,
  BoardBodyForRequest,
  Board,
} from '@interfaces/board-interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BoardsService } from '../boards/boards.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private allBoards$ = new BehaviorSubject<Board[]>([]);

  constructor(
    private readonly boardsDataService: BoardsService,
    private readonly localStorageService: LocalStorageService
  ) {}

  getAllBoard() {
    this.subscriptions.push(
      this.boardsDataService.getAllBoards().subscribe({
        next: (boards: Board[]) => {
          this.allBoards$.next(boards);
        },
        error: () => {},
      })
    );
  }

  getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  createBoard(event: AddBoardEvent) {
    const idFromLocalStorage =
      this.localStorageService.getFromLocalStorage('userId');

    const newBoardBody: BoardBodyForRequest = {
      title: event.value.title,
      owner: idFromLocalStorage,
      users: ['string'],
    };

    this.subscriptions.push(
      this.boardsDataService.createBoard(newBoardBody).subscribe({
        next: () => {
          this.boardsDataService.getAllBoards().subscribe({
            next: (item: Board[]) => {
              this.allBoards$.next(item);
            },
            error: () => {},
          });
        },
        error: () => {},
      })
    );
  }

  deleteBoard(boardId: string) {
    this.subscriptions.push(
      this.boardsDataService.deleteBoard(boardId).subscribe({
        next: () => {
          this.boardsDataService.getAllBoards().subscribe({
            next: (item: Board[]) => {
              this.allBoards$.next(item);
            },
            error: () => {},
          });
        },
        error: () => {},
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
// you should avoid subscriptions within other subscriptions. Better to use pipe
