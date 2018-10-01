import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrderModule } from './order.module';
import { State as OrderState } from './store/order.reducer';
import { GetOrders } from './store/order.action';
import { getAllOrders } from './store/order.selector';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private store: Store<OrderState>) {}

  getOrders() {
    this.store.dispatch(new GetOrders());
  }

  getAllOrders() {
    return this.store.select(getAllOrders);
  }
}
