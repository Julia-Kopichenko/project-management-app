import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  hide = true;

  userLoginForm: FormGroup = new FormGroup({
       login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  submit() {
    console.log('SUBMIT');

    console.log('FormGroup user =', this.userLoginForm);
    console.log('user.value =', this.userLoginForm.value);
  }
}
