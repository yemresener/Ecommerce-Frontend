import { TestBed } from '@angular/core/testing';

import { DeliveryMessageService } from './delivery-message.service';

describe('DeliveryMessageService', () => {
  let service: DeliveryMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
