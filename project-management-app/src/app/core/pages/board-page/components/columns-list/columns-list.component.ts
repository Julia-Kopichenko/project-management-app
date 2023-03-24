import { Component, OnDestroy, OnInit } from '@angular/core';
import { Column } from '@app/shared/models/interfaces/column-interface';
import { BordPageService } from '@app/shared/services/bord-page/bord-page.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-columns-list',
  templateUrl: './columns-list.component.html',
  styleUrls: ['./columns-list.component.scss'],
})
export class ColumnsListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  columns$: Observable<Column[]> = this.bordPageService.getAllColumns$();

  columns: [
    {
      _id: 'Column id';
      title: 'title 1';
      order: 1;
      boardId: 'Id of boards';
    },
    {
      _id: 'Column id';
      title: 'title 1';
      order: 1;
      boardId: 'Id of boards';
    },
    {
      _id: 'Column id';
      title: 'title 1';
      order: 1;
      boardId: 'Id of boards';
    }
  ];

  constructor(
    // private readonly localStorageService: LocalStorageService,
    private readonly bordPageService: BordPageService // private readonly modalService: ModalService
  ) {}

  ngOnInit() {
    this.bordPageService.getAllColumns();
    console.log('ngOnInit, columns', this.columns$);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
