import { Injectable } from '@angular/core';
import { Task } from '@app/shared/models/interfaces/task-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  allTasks$ = new BehaviorSubject<Task[]>([]);

  getAllTasks$(): Observable<Task[]> {
    return this.allTasks$.asObservable();
  }

  emitNewTasks(tasks: Task[]): void {
    this.allTasks$.next(tasks);
  }

  // addNewTask(task: Task): void {
  //   let arr: Task[] = [];

  //   const subscription: Subscription = this.allTasks$.subscribe((data) => {
  //     arr = [...data];
  //   });

  //   arr.push(task);

  //   subscription.unsubscribe();

  //   this.emitNewTasks(arr);
  // }
}
