import { Component, Input, OnDestroy } from '@angular/core';
import { Task } from '@app/shared/models/interfaces/task-interface';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() task: Task | undefined;

  data = 'Delete task?';

  constructor(private readonly translocoService: TranslocoService) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete task?';
        } else {
          this.data = 'Удалить задачу?';
        }
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  deleteTask(confirmItem: any, taskId: string) {
    console.log(confirmItem);
    console.log(taskId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
