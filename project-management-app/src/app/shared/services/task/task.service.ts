import { Injectable, OnDestroy } from '@angular/core';
import {
  Task,
  TaskBodyForRequest,
} from '@app/shared/models/interfaces/task-interface';
import { Subscription } from 'rxjs';
import { BordPageService } from '../bord-page/bord-page.service';
import { NotificationService } from '../notification/notification.service';
import { TaskDataService } from '../taskData/task-data.service';
import { TaskStoreService } from '../taskStore/task-store.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly taskDataService: TaskDataService,
    private readonly bordPageService: BordPageService,
    private readonly notificationService: NotificationService,
    private readonly taskStoreService: TaskStoreService
  ) {}

  getAllTasks(columnId: string): void {
    const currentBoardId: string = this.bordPageService.getCurrentBoardId();

    this.subscriptions.push(
      this.taskDataService.getAllTasks(currentBoardId, columnId).subscribe({
        next: (tasks: Task[]) => {
          this.taskStoreService.emitNewTasks({
            columnId,
            tasks,
          });
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
          next: () => {
            this.subscriptions.push(
              this.taskDataService
                .getAllTasks(currentBoardId, columnId)
                .subscribe({
                  next: (tasks: Task[]) => {
                    this.taskStoreService.emitNewTasks({
                      columnId,
                      tasks,
                    });
                  },
                  error: (err) => {
                    if (err.statusCode === 404) {
                      this.notificationService.showError(
                        'errorMessage.noTasks'
                      );
                    } else {
                      this.notificationService.showError(
                        'errorMessage.somethingWrong'
                      );
                    }
                  },
                })
            );
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

  deleteTask(columnId: string, taskId: string) {
    const currentBoardId: string = this.bordPageService.getCurrentBoardId();

    this.subscriptions.push(
      this.taskDataService
        .deleteTask(currentBoardId, columnId, taskId)
        .subscribe({
          next: () => {
            this.subscriptions.push(
              this.taskDataService
                .getAllTasks(currentBoardId, columnId)
                .subscribe({
                  next: (tasks: Task[]) => {
                    this.taskStoreService.emitNewTasks({
                      columnId,
                      tasks,
                    });
                  },
                  error: (err) => {
                    if (err.statusCode === 404) {
                      this.notificationService.showError(
                        'errorMessage.noTasks'
                      );
                    } else {
                      this.notificationService.showError(
                        'errorMessage.somethingWrong'
                      );
                    }
                  },
                })
            );
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
