import { Component } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CreateBoardComponent } from '../create-board/create-board.component';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss'],
})
export class BoardsListComponent {

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(CreateBoardComponent);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
}
