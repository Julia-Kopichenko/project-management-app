import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { TranslocoRootModule } from '@shared/transloco/transloco-root.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

@NgModule({
  declarations: [ClickStopPropagationDirective],
  imports: [
    CommonModule,
    MaterialModule,
    TranslocoRootModule,
    ReactiveFormsModule,
  ],
  exports: [
    MaterialModule,
    TranslocoRootModule,
    ReactiveFormsModule,
    ClickStopPropagationDirective,
  ],
})
export class SharedModule {}
