import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GetOrders, ResetOrders } from './store/order.action';
import { State as OrderState } from './store/order.reducer';
import { getAllOrders, getLoadingStatus } from './store/order.selector';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  isLoading$ = this.store.select(getLoadingStatus);

  constructor(private store: Store<OrderState>) {}

  resetOrders() {
    this.store.dispatch(new ResetOrders());
  }

  getOrders() {
    this.store.dispatch(new GetOrders());
  }

  getAllOrders() {
    return this.store.select(getAllOrders);
  }
}
