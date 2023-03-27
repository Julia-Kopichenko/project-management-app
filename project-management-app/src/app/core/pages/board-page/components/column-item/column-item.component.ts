/* eslint-disable no-underscore-dangle */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Column } from '@app/shared/models/interfaces/column-interface';
import {
  AddTaskEvent,
  Task,
} from '@app/shared/models/interfaces/task-interface';
import { ColumnService } from '@app/shared/services/column/column.service';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { TaskService } from '@app/shared/services/task/task.service';
import { TaskStoreService } from '@app/shared/services/taskStore/task-store.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  tasks: Task[] = [];

  @Input() column: Column | undefined;

  @Input() index: number;

  @Input() columnId: string;

  data = 'Delete column?';

  titleColumn = '';

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly columnService: ColumnService,
    private readonly taskService: TaskService,
    private readonly taskStoreService: TaskStoreService,
    private readonly modalService: ModalService
  ) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete column?';
        } else {
          this.data = 'Удалить колонку?';
        }
      })
    );
  }

  ngOnInit(): void {
    this.taskService.getAllTasks(this.columnId);

    this.subscriptions.push(
      this.taskStoreService.allTasks$.subscribe((data) => {
        if (data.columnId === this.columnId) {
          this.tasks = data.tasks;
        }
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteColumn(confirmItem: any, columnId: string): void {
    if (confirmItem.clicked) {
      this.columnService.deleteColumn(columnId);
    }
  }

  hideTitleColumn(index: number): void {
    document
      .getElementsByClassName('column__title')
      [index].classList.add('hide');
    document
      .getElementsByClassName('edit-container')
      [index].classList.add('visible');

    const currentColumnTitle =
      document.getElementsByClassName('column-title')[index].innerHTML;

    this.titleColumn = currentColumnTitle;
  }

  showTitleColumn(index: number): void {
    document
      .getElementsByClassName('column__title')
      [index].classList.remove('hide');

    document
      .getElementsByClassName('edit-container')
      [index].classList.remove('visible');
  }

  updateTitleColumn(columnId: string, columnIndex: number): void {
    const newTitle = this.titleColumn.trim();

    if (newTitle.length < 3 || newTitle.length > 20) {
      return;
    }

    this.showTitleColumn(columnIndex);

    this.columnService.updateTitleColumn(columnId, newTitle);
  }

  addNewTask(event: AddTaskEvent, columnId: string): void {
    if (event) {
      this.taskService.createTask(event.value, columnId);
    }
  }

  setIsOneFiledForm(): void {
    this.modalService.setIsOneFiledForm(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
