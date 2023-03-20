import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBoardEvent } from '@app/shared/models/interfaces/board-interface';
import { MainPageService } from '@app/shared/services/main-page/main-page.service';
import { ModalService } from '@app/shared/services/modal/modal.service';
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
  siteLanguage = 'en';

  isAuthorized = false;

  private subs!: Subscription;

  constructor(
    private readonly translate: TranslocoService,
    private readonly authService: AuthService,
    private readonly loginService: LoginService,
    private readonly modalService: ModalService,
    private readonly mainPageService: MainPageService
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

  setIsOneFiledForm() {
    this.modalService.setIsOneFiledForm(true);
  }

  addNewBoard(userTaskData: AddBoardEvent) {
    if (userTaskData) {
      this.mainPageService.createBoard(userTaskData);
    }
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable no-console */
  editProfile() {
    console.log('editProfile');
  }
}
