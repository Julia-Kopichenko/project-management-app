import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LocalStorageService } from '@app/shared/services/localStorage/local-storage.service';
import { LocalStorageKeys } from '@app/shared/models/enams/localStorage-keys';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { Observable } from 'rxjs';
import {
  AddColumnEvent,
  Column,
} from '@app/shared/models/interfaces/column-interface';
import { ColumnStoreService } from '@app/shared/services/columnStore/column-store.service';
import { ColumnService } from '@app/shared/services/column/column.service';

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
    private readonly modalService: ModalService,
    private readonly columnStoreService: ColumnStoreService,
    private readonly columnService: ColumnService
  ) {}

  ngOnInit(): void {
    this.columnService.getAllColumns();

    this.boardId = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardId
    ) as string;
    this.boardTitle = this.localStorageService.getFromLocalStorage(
      LocalStorageKeys.boardTitle
    ) as string;
  }

  onAddColumn(event: AddColumnEvent): void {
    if (event) {
      this.columnService.createColumn(event.value);
    }
  }

  setIsOneFiledForm(): void {
    this.modalService.setIsOneFiledForm(true);
  }

  goBack(): void {
    this.location.back();
  }
}
