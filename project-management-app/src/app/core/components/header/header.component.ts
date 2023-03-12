import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, RouterEvent, Router } from '@angular/router';
import { RoutesPath } from '@enams/routes-path';
import { TokenStorageService } from '@services/tokenStorage/token-storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { filter, Subscription } from 'rxjs';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUrl: string = '';
  siteLanguage: string = 'en';
  isAuthorized: boolean = false;

  subscription$: Subscription;

  constructor(
    private readonly translate: TranslocoService,
    private readonly tokenStorage: TokenStorageService,
    private router: Router,
    private readonly loginService: LoginService
  ) {
    this.subscription$ = this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        if (this.tokenStorage.getToken()) {
          this.isAuthorized = true;
        }

        // this.currentUrl = e.url;
        // if (
        //   this.currentUrl === RoutesPath.welcomePage ||
        //   this.currentUrl === RoutesPath.authPage ||
        //   this.currentUrl === RoutesPath.logInPage ||
        //   this.currentUrl === RoutesPath.signUpPage
        // ) {
        //   this.isAuthorized = false;
        // } else {
        //   if (this.tokenStorage.getToken()) {
        //     this.isAuthorized = true;
        //   }
        // }
        console.log(this.isAuthorized);
      });
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isAuthorized = true;
    }
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  onSiteLanguageChange(language: string): void {
    this.translate.setActiveLang(language);
    this.siteLanguage = language;
  }

  logOut() {
    this.loginService.logOut();
    this.isAuthorized = false;
  }
  newBoard() {
    console.log('openDialog');
  }
  editProfile() {
    console.log('editProfile');
  }
}
