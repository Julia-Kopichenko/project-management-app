/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { Task } from '@app/shared/models/interfaces/task-interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnStoreService {
  private allColumns$ = new BehaviorSubject<Column[]>([]);

  getAllColumns$(): Observable<Column[]> {
    return this.allColumns$.asObservable();
  }

  emitNewColumns(columns: Column[]): void {
    this.allColumns$.next(columns);
  }

  changeColumnTitle(columnId: string, title: string): void {
    let arr: Column[] = [];

    const subscription: Subscription = this.allColumns$.subscribe((data) => {
      arr = [...data];
    });

    arr.map((item: Column) => {
      if (item._id === columnId) {
        // eslint-disable-next-line no-param-reassign
        item.title = title;
        return item;
      }
      return item;
    });

    subscription.unsubscribe();

    this.emitNewColumns(arr);
  }

  // eslint-disable-next-line class-methods-use-this
  addTaskToColumn(task: Task) {
    console.log(task);
  }
}
