import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from '@app/dialog/dialog.module';
import { BoardPageComponent } from './board-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { ColumnItemComponent } from './components/column-item/column-item.component';
import { TaskItemComponent } from './components/task-item/task-item.component';

const routes: Routes = [
  { path: ':id', component: BoardPageComponent },
  { path: '', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [BoardPageComponent, ColumnItemComponent, TaskItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslocoModule,
    DialogModule,
    FormsModule,
  ],
})
export class BoardPageModule {}
