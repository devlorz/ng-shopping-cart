import { TestBed } from '@angular/core/testing';

import { OrderDataService } from './order-data.service';

describe('OrderDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderDataService = TestBed.get(OrderDataService);
    expect(service).toBeTruthy();
  });
});
