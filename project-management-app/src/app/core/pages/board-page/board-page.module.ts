import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { DialogModule } from '@app/dialog/dialog.module';
import { BoardPageComponent } from './board-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { ColumnsListComponent } from './components/columns-list/columns-list.component';

const routes: Routes = [
  { path: ':id', component: BoardPageComponent },
  { path: '', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [BoardPageComponent, ColumnsListComponent],
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
