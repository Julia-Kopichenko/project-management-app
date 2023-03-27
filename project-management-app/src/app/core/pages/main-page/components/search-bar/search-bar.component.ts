import { Component } from '@angular/core';
import { MainPageService } from '@app/shared/services/main-page/main-page.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchText = '';

  constructor(private readonly mainPageService: MainPageService) {}

  search(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;

    this.mainPageService.searchWord.next(this.searchText);
  }
}
