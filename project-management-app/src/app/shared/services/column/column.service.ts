import { Injectable, OnDestroy } from '@angular/core';
import {
  Column,
  ColumnBodyForRequest,
} from '@app/shared/models/interfaces/column-interface';
import { Subscription } from 'rxjs';
import { BordPageService } from '../bord-page/bord-page.service';
import { ColumnDataService } from '../columnData/column-data.service';
import { ColumnStoreService } from '../columnStore/column-store.service';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ColumnService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly columnDataService: ColumnDataService,
    private readonly columnStoreService: ColumnStoreService,
    private readonly notificationService: NotificationService,
    private readonly bordPageService: BordPageService,
    private readonly localStorageService: LocalStorageService
  ) {}

  getAllColumns(): void {
    const currentBoardId = this.bordPageService.getCurrentBoardId();
    this.subscriptions.push(
      this.columnDataService.getAllColumns(currentBoardId).subscribe({
        next: (columns: Column[]) => {
          this.columnStoreService.emitNewColumns(columns);
        },
        error: (err) => {
          if (err.statusCode === 404) {
            this.notificationService.showError('errorMessage.noColumns');
          } else {
            this.notificationService.showError('errorMessage.somethingWrong');
          }
        },
      })
    );
  }

  createColumn(newColumnTitle: { title: string }) {
    const currentBoardId = this.bordPageService.getCurrentBoardId();

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
                this.columnStoreService.emitNewColumns(columns);
              },
              error: (err) => {
                if (err.statusCode === 404) {
                  this.notificationService.showError('errorMessage.noColumns');
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
    const currentBoardId = this.bordPageService.getCurrentBoardId();

    this.subscriptions.push(
      this.columnDataService.deleteColumn(currentBoardId, columnId).subscribe({
        next: () => {
          this.columnDataService.getAllColumns(currentBoardId).subscribe({
            next: (columns: Column[]) => {
              this.columnStoreService.emitNewColumns(columns);
            },
            error: (err) => {
              if (err.statusCode === 404) {
                this.notificationService.showError('errorMessage.noColumns');
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

  updateTitleColumn(columnId: string, newTitle: string): void {
    const currentBoardId = this.bordPageService.getCurrentBoardId();

    const bodyRequest: ColumnBodyForRequest = {
      title: newTitle,
      order: 0,
    };

    this.subscriptions.push(
      this.columnDataService
        .updateColumn(currentBoardId, columnId, bodyRequest)
        .subscribe({
          next: (data) => {
            this.columnStoreService.changeColumnTitle(columnId, data.title);
          },
          error: (err) => {
            if (err.statusCode === 404) {
              this.notificationService.showError('errorMessage.noColumns');
            } else {
              this.notificationService.showError('errorMessage.somethingWrong');
            }
          },
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
