import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { RouterModule, Routes } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { BoardsListComponent } from './components/boards-list/boards-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SortBarComponent } from './components/sort-bar/sort-bar.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [{ path: '', component: MainPageComponent }];

@NgModule({
    declarations: [
        MainPageComponent,
        BoardsListComponent,
        SearchBarComponent,
        SortBarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TranslocoModule,
        SharedModule,
    ]
})
export class MainPageModule {}
