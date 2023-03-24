import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { BoardPageComponent } from './board-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { BoardContainerComponent } from './components/board-container/board-container.component';

const routes: Routes = [
  { path: ':id', component: BoardPageComponent },
  { path: '', component: NotFoundPageComponent },
];

@NgModule({
  declarations: [BoardPageComponent, BoardContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslocoModule,
  ],
})
export class BoardPageModule {}
