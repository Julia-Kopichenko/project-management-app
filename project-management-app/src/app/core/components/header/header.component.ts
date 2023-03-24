import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBoardEvent } from '@app/shared/models/interfaces/board-interface';
import { MainPageService } from '@app/shared/services/main-page/main-page.service';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { TranslocoService } from '@ngneat/transloco';
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

  userLogin = '';

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly translate: TranslocoService,
    private readonly loginService: LoginService,
    private readonly modalService: ModalService,
    private readonly mainPageService: MainPageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.loginService.isLoggedInStatus$.subscribe((isLoggedIn) => {
        this.isAuthorized = isLoggedIn;
      })
    );
    this.subscriptions.push(
      this.loginService.userLogin$.subscribe((userLogin) => {
        this.userLogin = userLogin;
      })
    );
  }

  onSiteLanguageChange(language: string): void {
    this.translate.setActiveLang(language);
    this.siteLanguage = language;
  }

  logOut(): void {
    this.loginService.logOut();
    this.isAuthorized = false;
  }

  setIsOneFiledForm(): void {
    this.modalService.setIsOneFiledForm(true);
  }

  addNewBoard(userTaskData: AddBoardEvent): void {
    if (userTaskData) {
      this.mainPageService.createBoard(userTaskData);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
