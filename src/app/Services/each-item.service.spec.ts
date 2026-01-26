import { TestBed } from '@angular/core/testing';

import { EachItemService } from './each-item.service';

describe('EachItemService', () => {
  let service: EachItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EachItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
