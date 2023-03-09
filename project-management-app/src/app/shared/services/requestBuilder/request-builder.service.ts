import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RequestBuilderService {
  constructor(private readonly http: HttpClient) {}

  post<T>(url: string, body: unknown): Observable<T> {
    return this.http.post<T>(url, body);
  }
}
