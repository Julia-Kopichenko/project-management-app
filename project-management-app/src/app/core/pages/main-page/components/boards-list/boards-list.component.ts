import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AddBoardEvent,
  Board,
} from '@app/shared/models/interfaces/board-interface';
import { ModalService } from '@app/shared/services/modal/modal.service';
import { MainPageService } from '@services/main-page/main-page.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  boards$: Observable<Board[]> = this.mainPageService.getAllBoards$();

  searchText: string;

  constructor(
    private readonly mainPageService: MainPageService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.mainPageService.getAllBoard();

    this.subscriptions.push(
      this.mainPageService.searchWord.subscribe(
        // eslint-disable-next-line no-return-assign
        (data) => (this.searchText = data)
      )
    );
  }

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

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
