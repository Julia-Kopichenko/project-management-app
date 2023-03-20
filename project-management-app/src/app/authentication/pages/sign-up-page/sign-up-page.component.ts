/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  userRegisterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  // userRegisterForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   login: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //   ]),
  // });

  constructor(
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    const userData = {
      name: this.userRegisterForm.value.name,
      login: this.userRegisterForm.value.login,
      password: this.userRegisterForm.value.password,
    };

    this.subscriptions.push(
      this.authService.signUp(userData).subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
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
