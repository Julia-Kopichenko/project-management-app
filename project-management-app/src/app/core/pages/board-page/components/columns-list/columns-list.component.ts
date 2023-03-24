import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Column,
  ColumnBodyForRequest,
} from '@app/shared/models/interfaces/column-interface';
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

  titleColumn = '';

  private isOpenEditColumn = false;

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

  deleteBoard(confirmItem: any, columnId: string): void {
    if (confirmItem.clicked) {
      this.isOpenEditColumn = false;

      this.bordPageService.deleteColumn(columnId);
    }
  }

  hideTitleColumn(index: number): void {
    if (!this.isOpenEditColumn) {
      this.isOpenEditColumn = true;

      document
        .getElementsByClassName('column__title')
        [index].classList.add('hide');
      document
        .getElementsByClassName('edit-container')
        [index].classList.add('visible');

      const currentColumnTitle =
        document.getElementsByClassName('column-title')[index].innerHTML;

      this.titleColumn = currentColumnTitle;
    }
  }

  showTitleColumn(index: number): void {
    this.isOpenEditColumn = false;

    document
      .getElementsByClassName('column__title')
      [index].classList.remove('hide');

    document
      .getElementsByClassName('edit-container')
      [index].classList.remove('visible');
  }

  updateTitleColumn(columnId: string, columnIndex: number): void {
    const newTitleColumn = this.titleColumn.trim();

    if (newTitleColumn.length < 3 || newTitleColumn.length > 20) {
      return;
    }

    this.showTitleColumn(columnIndex);

    const bodyRequest: ColumnBodyForRequest = {
      title: newTitleColumn,
      order: 0,
    };

    this.bordPageService.updateTitleColumn(columnId, bodyRequest, columnIndex);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
