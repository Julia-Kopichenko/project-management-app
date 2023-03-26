import { Injectable, OnDestroy } from '@angular/core';
import {
  Task,
  TaskBodyForRequest,
} from '@app/shared/models/interfaces/task-interface';
import { Subscription } from 'rxjs';
import { BordPageService } from '../bord-page/bord-page.service';
import { ColumnStoreService } from '../columnStore/column-store.service';
import { NotificationService } from '../notification/notification.service';
import { TaskDataService } from '../taskData/task-data.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly taskDataService: TaskDataService,
    private readonly bordPageService: BordPageService,
    private readonly notificationService: NotificationService,
    private readonly columnStoreService: ColumnStoreService
  ) {}

  createTask(
    value: { title: string; description: string },
    columnId: string
  ): void {
    const currentBoardId: string = this.bordPageService.getCurrentBoardId();

    const newTaskBody: TaskBodyForRequest = {
      title: value.title,
      order: 0,
      description: value.description,
      userId: 0,
      users: [],
    };

    this.subscriptions.push(
      this.taskDataService
        .createTask(currentBoardId, columnId, newTaskBody)
        .subscribe({
          next: (task: Task) => {
            this.columnStoreService.addTaskToColumn(task);
          },
          error: (err) => {
            if (err.statusCode === 404) {
              this.notificationService.showError('errorMessage.noTasks');
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
