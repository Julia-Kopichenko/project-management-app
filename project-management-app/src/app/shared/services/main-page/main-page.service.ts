/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import {
  AddBoardEvent,
  BoardBodyForRequest,
  Board,
} from '@interfaces/board-interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BoardsDataService } from '../boardsData/boardsData.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private allBoards$ = new BehaviorSubject<Board[]>([]);

  searchWord = new BehaviorSubject<string>('');

  constructor(
    private readonly boardsDataService: BoardsDataService,
    private readonly localStorageService: LocalStorageService,
    private readonly notificationService: NotificationService
  ) {}

  getAllBoard(): void {
    this.subscriptions.push(
      this.boardsDataService.getAllBoards().subscribe({
        next: (boards: Board[]) => {
          this.allBoards$.next(boards);
        },
        error: (err) => {
          if (err.statusCode === 404) {
            this.notificationService.showError('errorMessage.noBoards');
          } else {
            this.notificationService.showError('errorMessage.somethingWrong');
          }
        },
      })
    );
  }

  getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  createBoard(event: AddBoardEvent) {
    const currentUserId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.userId
    );

    const newBoardBody: BoardBodyForRequest = {
      title: event.value.title,
      owner: currentUserId,
      users: ['string'],
    };

    this.subscriptions.push(
      this.boardsDataService.createBoard(newBoardBody).subscribe({
        next: () => {
          this.boardsDataService.getAllBoards().subscribe({
            next: (item: Board[]) => {
              this.allBoards$.next(item);
            },
            error: (err) => {
              if (err.statusCode === 404) {
                this.notificationService.showError('errorMessage.noBoards');
              } else {
                this.notificationService.showError(
                  'errorMessage.somethingWrong'
                );
              }
            },
          });
        },
        error: () => {
          this.notificationService.showError('errorMessage.somethingWrong');
        },
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
            error: (err) => {
              if (err.statusCode === 404) {
                this.notificationService.showError('errorMessage.noBoards');
              } else {
                this.notificationService.showError(
                  'errorMessage.somethingWrong'
                );
              }
            },
          });
        },
        error: () => {
          this.notificationService.showError('errorMessage.somethingWrong');
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
// you should avoid subscriptions within other subscriptions. Better to use pipe
