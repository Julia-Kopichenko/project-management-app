/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutesPath } from '@app/shared/models/enams/routes-path';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { NotificationService } from '@app/shared/services/notification/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  hide = true;

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    const userData = {
      name: this.form.value.name,
      login: this.form.value.login,
      password: this.form.value.password,
    };

    this.subscriptions.push(
      this.authService.signUp(userData).subscribe({
        next: () => {
          this.router.navigate([RoutesPath.logInPage]);
        },
        error: (err) => {
          if (err.error.statusCode === 409) {
            this.notificationService.showError('errorMessage.loginConflict');
          } else {
            this.notificationService.showError('errorMessage.somethingWrong');
          }
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
