import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '@app/shared/services/login/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;

  userLoginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(1)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
  });
  // userLoginForm: FormGroup = new FormGroup({
  //   login: new FormControl('', [Validators.required, Validators.minLength(5)]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //   ]),
  // });

  constructor(private readonly loginService: LoginService) {}

  onSubmit(): void {
    this.loginService.logIn(this.userLoginForm.value);
  }
}
