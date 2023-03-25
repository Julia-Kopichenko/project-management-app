import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LocalStorageService } from '@app/shared/services/localStorage/local-storage.service';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { BordPageService } from '@app/shared/services/bord-page/bord-page.service';
import { Observable } from 'rxjs';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { ColumnStoreService } from '@app/shared/services/columnStore/column-store.service';

export interface AddColumn {
  clicked: string;
  value: {
    title: string;
  };
}
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  columns$: Observable<Column[]> = this.columnStoreService.getAllColumns$();

  boardId = '';

  boardTitle = '';

  constructor(
    private location: Location,
    private readonly localStorageService: LocalStorageService,
    private readonly bordPageService: BordPageService,
    private readonly modalService: ModalService,
    private readonly columnStoreService: ColumnStoreService
  ) {}

  ngOnInit(): void {
    this.bordPageService.getAllColumns();

    this.boardId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardId
    ) as string;
    this.boardTitle = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardTitle
    ) as string;
  }

  onAddColumn(newTitle: AddColumn) {
    if (newTitle.clicked === 'submit') {
      this.bordPageService.createColumn(newTitle.value);
    }
  }

  setIsOneFiledForm() {
    this.modalService.setIsOneFiledForm(true);
  }

  goBack(): void {
    this.location.back();
  }
}
