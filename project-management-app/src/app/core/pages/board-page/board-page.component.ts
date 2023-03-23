import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
