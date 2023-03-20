import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalBodyComponent } from './confirm-modal-body/confirm-modal-body.component';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() data!: string;

  @Output() emitConfirm: EventEmitter<boolean> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const ref: MatDialogRef<ConfirmModalBodyComponent> = this.dialog.open(
      ConfirmModalBodyComponent,
      {
        width: '280px',
        data: {
          message: this.data,
          buttonText: {
            ok: 'Save',
            cancel: 'No',
          },
        },
        backdropClass: 'confirmDialogComponent',
        hasBackdrop: true,
      }
    );

    ref.afterClosed().subscribe((result) => {
      this.emitConfirm.emit(result);
    });
  }
}
