import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import {
  Column,
  ColumnBodyForRequest,
} from '@app/shared/models/interfaces/column-interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ColumnDataService } from '../columnData/column-data.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class BordPageService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private allColumns$ = new BehaviorSubject<Column[]>([]);

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly columnDataService: ColumnDataService,
    private readonly notificationService: NotificationService
  ) {}

  getCurrentBoardId() {
    const board = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardId
    ) as string;
    return board;
  }

  getAllColumns(): void {
    const currentBoardId = this.getCurrentBoardId();
    this.subscriptions.push(
      this.columnDataService.getAllColumns(currentBoardId).subscribe({
        next: (columns: Column[]) => {
          this.allColumns$.next(columns);
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

  getAllColumns$() {
    return this.allColumns$.asObservable();
  }

  createColumn(newColumnTitle: { title: string }) {
    const currentBoardId = this.getCurrentBoardId();

    const newColumnBody: ColumnBodyForRequest = {
      title: newColumnTitle.title,
      order: 0,
    };

    this.subscriptions.push(
      this.columnDataService
        .createColumn(currentBoardId, newColumnBody)
        .subscribe({
          next: () => {
            this.columnDataService.getAllColumns(currentBoardId).subscribe({
              next: (columns: Column[]) => {
                this.allColumns$.next(columns);
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

  deleteColumn(columnId: string) {
    const currentBoardId = this.getCurrentBoardId();

    this.subscriptions.push(
      this.columnDataService.deleteColumn(currentBoardId, columnId).subscribe({
        next: () => {
          this.columnDataService.getAllColumns(currentBoardId).subscribe({
            next: (columns: Column[]) => {
              this.allColumns$.next(columns);
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

  // for update title

  // eslint-disable-next-line class-methods-use-this
  changeColumnTitle(columnTitle: string, columnIndex: number): void {
    document.getElementsByClassName('column-title')[columnIndex].innerHTML =
      columnTitle;
  }

  updateTitleColumn(
    columnId: string,
    bodyRequest: ColumnBodyForRequest,
    columnIndex: number
  ): void {
    const currentBoardId = this.getCurrentBoardId();

    this.subscriptions.push(
      this.columnDataService
        .updateColumn(currentBoardId, columnId, bodyRequest)
        .subscribe({
          next: (data) => {
            this.changeColumnTitle(data.title, columnIndex);
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

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
