import { TestBed } from '@angular/core/testing';

import { CustomerReceiverService } from './customer-receiver.service';

describe('CustomerReceiverService', () => {
  let service: CustomerReceiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReceiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
