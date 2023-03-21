/* eslint-disable class-methods-use-this */
import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '@app/shared/models/interfaces/board-interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(boards: Board[], searchText: string): Board[] {
    if (boards) {
      if (boards.length === 0 || searchText === '') {
        return boards;
      }
      return boards.filter((board) => {
        return board.title.toLowerCase().includes(searchText.toLowerCase());
      });
    }

    return boards;
  }
}
