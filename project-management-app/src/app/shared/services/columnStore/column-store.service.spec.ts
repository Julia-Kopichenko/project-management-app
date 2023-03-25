import { TestBed } from '@angular/core/testing';

import { ColumnStoreService } from './column-store.service';

describe('ColumnStoreService', () => {
  let service: ColumnStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
