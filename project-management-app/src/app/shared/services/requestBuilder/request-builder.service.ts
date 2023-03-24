import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestBuilderService {
  constructor(private readonly http: HttpClient) {}

  post<T>(url: string, data: unknown): Observable<T> {
    return this.http.post<T>(url, data);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  put<T>(url: string, data: unknown): Observable<T> {
    return this.http.put<T>(url, data);
  }
}
