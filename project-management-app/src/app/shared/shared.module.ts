import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    TranslocoRootModule,
    ReactiveFormsModule,
  ],
  exports: [MaterialModule, TranslocoRootModule, ReactiveFormsModule],
})
export class SharedModule {}
