import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { DialogBodyComponent } from './prompt-modal/dialog-body/dialog-body.component';
import { DialogComponent } from './prompt-modal/dialog.component';

import { ConfirmModalBodyComponent } from './confirm-modal/confirm-modal-body/confirm-modal-body.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    DialogBodyComponent,
    DialogComponent,
    ConfirmModalComponent,
    ConfirmModalBodyComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [
    DialogBodyComponent,
    DialogComponent,
    ConfirmModalComponent,
    ConfirmModalBodyComponent,
  ],
})
export class DialogModule {}
