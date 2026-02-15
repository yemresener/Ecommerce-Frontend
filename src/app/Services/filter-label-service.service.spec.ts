import { TestBed } from '@angular/core/testing';

import { FilterLabelServiceService } from './filter-label-service.service';

describe('FilterLabelServiceService', () => {
  let service: FilterLabelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterLabelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
