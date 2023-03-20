import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private snackBar: MatSnackBar,
    private readonly translocoService: TranslocoService
  ) {}

  showError(key: string): void {
    this.subscriptions.push(
      this.translocoService
        .selectTranslate(key)
        .subscribe((message: string) => {
          this.snackBar.open(message, 'X', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
