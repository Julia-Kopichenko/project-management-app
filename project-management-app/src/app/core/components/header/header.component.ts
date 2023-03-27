import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBoardEvent } from '@app/shared/models/interfaces/board-interface';
import { LocalStorageService } from '@app/shared/services/localStorage/local-storage.service';
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

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly translate: TranslocoService,
    public loginService: LoginService,
    private readonly modalService: ModalService,
    private readonly localStorageService: LocalStorageService,
    private readonly mainPageService: MainPageService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.loginService.isLoggedInStatus$.subscribe((isLoggedIn) => {
        this.isAuthorized = isLoggedIn;
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

  addNewBoard(event: AddBoardEvent): void {
    if (event) {
      this.mainPageService.createBoard(event.value);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
