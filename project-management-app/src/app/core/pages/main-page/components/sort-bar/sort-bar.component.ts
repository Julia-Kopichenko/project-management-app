import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainPageService } from '@app/shared/services/main-page/main-page.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sort-bar',
  templateUrl: './sort-bar.component.html',
  styleUrls: ['./sort-bar.component.scss'],
})
export class SortBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  sortOrder: string;

  rotateIcon: boolean;

  constructor(
    private readonly mainPageService: MainPageService,
    private translocoService: TranslocoService
  ) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.sortOrder = 'Sort by A-Z';
        } else {
          this.sortOrder = 'Сортировать от А-Я';
        }
      })
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.mainPageService.sortOrder.subscribe(
        // eslint-disable-next-line no-return-assign
        (data) => (this.sortOrder = data)
      )
    );
  }

  public sort() {
    this.translocoService.langChanges$.subscribe((lang) => {
      if (this.sortOrder === 'by A-Z' || this.sortOrder === 'от А-Я') {
        if (lang === 'en') {
          this.mainPageService.sortOrder.next('by Z-A');
        } else {
          this.mainPageService.sortOrder.next('от Я-А');
        }
        this.rotateIcon = true;
      } else if (this.sortOrder === 'by Z-A' || this.sortOrder === 'от Я-А') {
        if (lang === 'en') {
          this.mainPageService.sortOrder.next('by A-Z');
        } else {
          this.mainPageService.sortOrder.next('от А-Я');
        }

        this.rotateIcon = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
