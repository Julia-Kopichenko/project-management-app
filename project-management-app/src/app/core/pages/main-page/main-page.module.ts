import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from '@shared/shared.module';
import { MainPageComponent } from './main-page.component';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardItemComponent } from './components/board-item/board-item.component';

const routes: Routes = [{ path: '', component: MainPageComponent }];

@NgModule({
  declarations: [
    MainPageComponent,
    BoardsListComponent,
    SearchBarComponent,
    SortBarComponent,
    CreateBoardComponent,
    BoardItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoModule,
    SharedModule,
  ],
})
export class MainPageModule {}
