/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable, OnDestroy } from '@angular/core';
import { AddBoardEvent, Board } from '@interfaces/board-interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BoardsService } from '../boards/boards.service';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService implements OnDestroy {
  subscription1$: Subscription;

  subscription2$: Subscription;

  private allBoards$ = new BehaviorSubject<Board[]>([]);

  constructor(
    private readonly boardsDataService: BoardsService,
    private readonly localStorageService: LocalStorageService
  ) {}

  getAllBoard() {
    this.subscription1$ = this.boardsDataService.getAllBoards().subscribe({
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

    const newBoardBody: Board = {
      title: event.value.title,
      owner: idFromLocalStorage,
      users: ['string'],
    };

    this.subscription2$ = this.boardsDataService
      .createBoard(newBoardBody)
      .subscribe({
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

  ngOnDestroy() {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
// you should avoid subscriptions within other subscriptions. Better to use pipe
