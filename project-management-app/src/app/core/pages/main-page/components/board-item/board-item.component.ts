import { Component, Input, OnDestroy } from '@angular/core';
import { MainPageService } from '@app/shared/services/main-page/main-page.service';
import { Board } from '@interfaces/board-interface';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() board: Board | undefined;

  data = 'Delete project?';

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly translocoService: TranslocoService
  ) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete project?';
        } else {
          this.data = 'Удалить проект?';
        }
      })
    );
  }

  deleteBoard(confirmItem: any, boardId: string) {
    if (confirmItem.clicked) {
      this.mainPageService.deleteBoard(boardId);
    }
  }

  openBoard(boardId: string) {
    this.mainPageService.openBoard(boardId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
