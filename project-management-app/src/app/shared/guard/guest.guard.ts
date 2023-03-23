import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoutesPath } from '../models/enams/routes-path';
import { LoginService } from '../services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private readonly loginService: LoginService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigate([RoutesPath.mainPage]);
    return false;
  }
}
