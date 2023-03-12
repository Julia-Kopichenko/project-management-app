import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/shared/services/authentication/authentication.service';
import { TokenStorageService } from '@services/tokenStorage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})

export class LoginPageComponent implements OnInit {
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  userLoginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    // }
  }

  onSubmit(): void {
    const userData = this.userLoginForm.value;

    this.authenticationService.logIn(userData).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      },
    });
  }
}
