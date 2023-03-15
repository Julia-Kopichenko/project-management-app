import { Component, Input } from '@angular/core';
import { Board } from '@interfaces/board-interface';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent {
  @Input() board: Board | undefined;

  @Input() backgroundImgUrl: string | undefined;

  /* eslint-disable class-methods-use-this */
  /* eslint-disable no-console */
  onDelete(e: Event): void {
    console.log(e);
  }
}
