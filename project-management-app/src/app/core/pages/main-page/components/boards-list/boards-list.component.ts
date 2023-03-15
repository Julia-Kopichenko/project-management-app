import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Board } from '@app/shared/models/interfaces/board-interface';
import { MainPageService } from '@services/main-page/main-page.service';
import { Observable } from 'rxjs';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
  boards$: Observable<Board[]> = this.mainPageService.getAllBoards$();

  // boards = [
  //   {
  //     id: "1",
  //     title: 'First',
  //     description: 'string',
  //   },
  //   {
  //     id: "2",
  //     title: 'Two',
  //     description: 'string string',
  //   },
  //   {
  //     id: "3",
  //     title: 'Two zfdzfgfgd',
  //     description: 'string string fzgdzfgdzfgdzfg zdfzdfzdfgzdfg ',
  //   },
  //   {
  //     id: "3",
  //     title: 'Two zfdzfgfgd',
  //     description: 'string string fzgdzfgdzfgdzfg zdfzdfzdfgzdfg ',
  //   },
  // ];

  constructor(
    private mainPageService: MainPageService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.mainPageService.getAllBoard();
  }

  ngOnDestroy() {}

  addNewBoard(): void {
    this.dialog.open(CreateBoardComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
  openBoard(board: Board) {}
}
