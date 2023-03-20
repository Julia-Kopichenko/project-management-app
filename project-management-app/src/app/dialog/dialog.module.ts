import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { DialogBodyComponent } from './prompt-modal/dialog-body/dialog-body.component';
import { DialogComponent } from './prompt-modal/dialog.component';

@NgModule({
  declarations: [DialogBodyComponent, DialogComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [DialogBodyComponent, DialogComponent],
})
export class DialogModule {}
