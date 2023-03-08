import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
  public siteLanguage: string = 'en';

  constructor(private service: TranslocoService) {}

  public onSiteLanguageChange(language: string): void {
    this.service.setActiveLang(language);
    this.siteLanguage = language;
  }
}
