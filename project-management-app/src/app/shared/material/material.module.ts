import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class MaterialModule {}
