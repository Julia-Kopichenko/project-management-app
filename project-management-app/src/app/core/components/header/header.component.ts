import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from '@services/auth/auth.service';
import { LoginService } from '@services/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string = '';
  siteLanguage: string = 'en';
  isAuthorized: boolean = false;

  private subs!: Subscription;

  constructor(
    private readonly translate: TranslocoService,
    private readonly authService: AuthService,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.subs = this.loginService.isLoggedInStatus$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isAuthorized = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onSiteLanguageChange(language: string): void {
    this.translate.setActiveLang(language);
    this.siteLanguage = language;
  }

  logOut() {
    this.authService.logOut();
    this.isAuthorized = false;
  }
  newBoard() {
    console.log('openDialog');
  }
  editProfile() {
    console.log('editProfile');
  }
}
