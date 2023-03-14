import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MainPageService } from '@services/main-page/main-page.service';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent implements OnInit, OnDestroy {
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
}
