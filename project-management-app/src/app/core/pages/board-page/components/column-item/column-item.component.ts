import { Component, Input, OnDestroy } from '@angular/core';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { BordPageService } from '@app/shared/services/bord-page/bord-page.service';
import { ColumnStoreService } from '@app/shared/services/columnStore/column-store.service';
import { TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-column-item',
  templateUrl: './column-item.component.html',
  styleUrls: ['./column-item.component.scss'],
})
export class ColumnItemComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() column: Column | undefined;

  @Input() index: number;

  data = 'Delete column?';

  titleColumn = '';

  private isOpenEditColumn = false;

  constructor(
    private readonly translocoService: TranslocoService,
    private readonly bordPageService: BordPageService,
    private readonly columnStoreService: ColumnStoreService
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

  deleteColumn(confirmItem: any, columnId: string): void {
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
    const newTitle = this.titleColumn.trim();

    if (newTitle.length < 3 || newTitle.length > 20) {
      return;
    }

    this.showTitleColumn(columnIndex);

    this.bordPageService.updateTitleColumn(columnId, newTitle);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
