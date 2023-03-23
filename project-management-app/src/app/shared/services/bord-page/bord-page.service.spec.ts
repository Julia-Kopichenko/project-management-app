import { TestBed } from '@angular/core/testing';

import { BordPageService } from './bord-page.service';

describe('BordPageService', () => {
  let service: BordPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BordPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
