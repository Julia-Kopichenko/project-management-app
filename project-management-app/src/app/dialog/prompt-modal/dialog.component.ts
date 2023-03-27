import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() emitText: EventEmitter<any> = new EventEmitter();

  @Input() oneFieldForm = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBodyComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.emitText.emit(result);
    });
  }
}
