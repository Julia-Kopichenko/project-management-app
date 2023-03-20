import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal-body',
  templateUrl: './confirm-modal-body.component.html',
  styleUrls: ['./confirm-modal-body.component.scss'],
})
export class ConfirmModalBodyComponent {
  message = '';

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalBodyComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }
}
