import { Injectable } from '@angular/core';
import { Task } from '@app/shared/models/interfaces/task-interface';
import { BehaviorSubject } from 'rxjs';

interface AllTask {
  columnId: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  allTasks$ = new BehaviorSubject<AllTask>({ columnId: '', tasks: [] });

  emitNewTasks(allTasks: AllTask): void {
    this.allTasks$.next(allTasks);
  }
}
