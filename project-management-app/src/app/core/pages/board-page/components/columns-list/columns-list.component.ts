import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { BordPageService } from '@app/shared/services/bord-page/bord-page.service';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  columns$: Observable<Column[]> = this.bordPageService.getAllColumns$();

  data = 'Delete column?';

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly bordPageService: BordPageService
  ) {
    this.subscriptions.push(
      translocoService.langChanges$.subscribe((lang) => {
        if (lang === 'en') {
          this.data = 'Delete column?';
        } else {
          this.data = 'Удалить колонку?';
        }
      })
    );
  }

  ngOnInit() {
    this.bordPageService.getAllColumns();
  }

  deleteBoard(confirmItem: any, columnId: string) {
    if (confirmItem.clicked) {
      this.bordPageService.deleteColumn(columnId);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
