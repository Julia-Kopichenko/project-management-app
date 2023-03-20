/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { LocalStorageService } from '@app/shared/services/localStorage/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnDestroy {
  subscription: Subscription;

  hide = true;

  isSuccessful = false;

  isSignUpFailed = false;

  errorMessage = '';

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
    private readonly localStorageService: LocalStorageService
  ) {}

  onSubmit(): void {
    const userData = {
      name: this.userRegisterForm.value.name,
      login: this.userRegisterForm.value.login,
      password: this.userRegisterForm.value.password,
    };

    this.subscription = this.authService.signUp(userData).subscribe({
      next: (body) => {
        // eslint-disable-next-line no-underscore-dangle
        this.localStorageService.saveInLocalStorage('userId', body._id);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
