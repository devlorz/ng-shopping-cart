import { TestBed } from '@angular/core/testing';

import { CartDataService } from './cart-data.service';

xdescribe('CartDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartDataService = TestBed.get(CartDataService);
    expect(service).toBeTruthy();
  });
});
