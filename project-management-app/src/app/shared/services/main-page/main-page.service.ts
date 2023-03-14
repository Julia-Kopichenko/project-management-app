import { Injectable } from '@angular/core';
import { BoardsService } from '../boards/boards.service';

@Injectable({
  providedIn: 'root',
})
export class MainPageService {
  constructor(private boardsDataService: BoardsService) {}

  getAllBoard() {
    this.boardsDataService.getAllBoards().subscribe({
      next: (data) => {
       console.log('AllBoard',data);
      },
    });
  }

  createBoard(){}
}
