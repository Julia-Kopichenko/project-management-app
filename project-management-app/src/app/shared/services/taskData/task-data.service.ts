import { Injectable } from '@angular/core';
import { UrlsEnum } from '@app/shared/models/enams/urls-enams';
import {
  Task,
  TaskBodyForRequest,
} from '@app/shared/models/interfaces/task-interface';
import { Observable } from 'rxjs';
import { RequestBuilderService } from '../requestBuilder/request-builder.service';

@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  constructor(private readonly requestBuilderService: RequestBuilderService) {}

  getAllTasks(boardId: string, columnId: string): Observable<Task[]> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}/${columnId}/${UrlsEnum.tasks}`;

    return this.requestBuilderService.get<Task[]>(url);
  }

  createTask(
    boardId: string,
    columnId: string,
    body: TaskBodyForRequest
  ): Observable<Task> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}/${columnId}/${UrlsEnum.tasks}`;

    return this.requestBuilderService.post<Task>(url, body);
  }

  deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Observable<Task> {
    const url = `${UrlsEnum.baseURL}/${UrlsEnum.boards}/${boardId}/${UrlsEnum.columns}/${columnId}/${UrlsEnum.tasks}/${taskId}`;

    return this.requestBuilderService.delete<Task>(url);
  }
}
