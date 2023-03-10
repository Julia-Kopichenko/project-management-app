import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@services/authentication/authentication.service';

@Component({
  selector: 'sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent {
  hide = true;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  userRegisterForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authenticationService: AuthenticationService) {}

  onSubmit() {
    const userData = {
      name: this.userRegisterForm.value.name,
      login: this.userRegisterForm.value.login,
      password: this.userRegisterForm.value.password,
    };

    this.authenticationService.signUp(userData).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      },
    });
  }
}
