import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AddBoardEvent,
  Board,
} from '@app/shared/models/interfaces/board-interface';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { MainPageService } from '@services/main-page/main-page.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]> = this.mainPageService.getAllBoards$();

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.mainPageService.getAllBoard();
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable @angular-eslint/no-empty-lifecycle-method */
  ngOnDestroy() {}

  addNewBoard(userTaskData: AddBoardEvent) {
    if (userTaskData) {
      this.mainPageService.createBoard(userTaskData);
    }
  }

  setIsOneFiledForm() {
    this.modalService.setIsOneFiledForm(true);
  }

  /* eslint-disable class-methods-use-this */
  /* eslint-disable no-console */
  openBoard(board: Board) {
    console.log(board);
  }
}
