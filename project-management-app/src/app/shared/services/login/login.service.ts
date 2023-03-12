import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  logOut() {
    console.log('logOut');
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
