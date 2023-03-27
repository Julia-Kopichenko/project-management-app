import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '@app/shared/models/interfaces/board-interface';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(boards: Board[], sortOrder: string) {
    if (boards) {
      let multiplier = 1;

      if (sortOrder === 'by Z-A' || sortOrder === 'от Я-А') {
        multiplier = -1;
      }

      boards.sort((a, b) => {
        if (a.title > b.title) {
          return 1 * multiplier;
        }
        if (a.title < b.title) {
          return -1 * multiplier;
        }
        return 0;
      });
    }

    return boards;
  }
}
