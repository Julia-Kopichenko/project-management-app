/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { RoutesPath } from '@app/shared/models/enams/routes-path';
import { BoardBodyForRequest, Board } from '@interfaces/board-interface';
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
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  getAllBoard(): void {
    const currentUserId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.userId
    ) as string;

    this.subscriptions.push(
      this.boardsDataService.getAllBoards(currentUserId).subscribe({
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

  createBoard(value: Board) {
    const currentUserId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.userId
    ) as string;

    const newBoardBody: BoardBodyForRequest = {
      title: value.title,
      owner: currentUserId,
      users: ['string'],
    };

    this.subscriptions.push(
      this.boardsDataService.createBoard(newBoardBody).subscribe({
        next: () => {
          this.boardsDataService.getAllBoards(currentUserId).subscribe({
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
    const currentUserId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.userId
    ) as string;

    this.subscriptions.push(
      this.boardsDataService.deleteBoard(boardId).subscribe({
        next: () => {
          this.boardsDataService.getAllBoards(currentUserId).subscribe({
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

  openBoard(boardId: string, boardTitle: string) {
    this.localStorageService.saveInLocalStorage(
      LocalStorageKeys.boardId,
      boardId
    );
    this.localStorageService.saveInLocalStorage(
      LocalStorageKeys.boardTitle,
      boardTitle
    );
    this.router.navigate([RoutesPath.boardPage, boardId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
