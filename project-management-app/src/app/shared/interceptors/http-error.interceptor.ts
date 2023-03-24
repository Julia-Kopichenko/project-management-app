import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { NotificationService } from '../services/notification/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private readonly localStorageService: LocalStorageService,
    private readonly notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error.message === 'Unauthorized') {
          this.localStorageService.clearLocalStorage();
          this.notificationService.showError('errorMessage.token');
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
