/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { Board } from '@interfaces/board-interface';
import { BehaviorSubject } from 'rxjs';
import { BoardsService } from '../boards/boards.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  private allBoards$ = new BehaviorSubject<Board[]>([]);

  constructor(private boardsDataService: BoardsService) {}

  getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (boards: Board[]) => {
        console.log('AllBoard', boards);
        this.allBoards$.next(boards);
      },
      error: () => {},
    });
  }

  getAllBoards$() {
    return this.allBoards$.asObservable();
  }

  /* eslint-disable class-methods-use-this */
  createBoard() {}
}
