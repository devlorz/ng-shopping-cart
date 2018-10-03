import { produce } from 'immer';

import { Order } from '../order.model';
import { OrderActions, OrderActionTypes } from './order.action';

export interface State {
  orders: Array<Order>;
  isLoading: boolean;
}

const initialState: State = {
  orders: [],
  isLoading: false
};

export function reducer(state = initialState, action: OrderActions) {
  return produce(state, draft => {
    switch (action.type) {
      case OrderActionTypes.GetOrders: {
        draft.isLoading = true;
        return;
      }
      case OrderActionTypes.GetOrdersSuccess: {
        draft.orders = action.payload;
        draft.isLoading = false;
        return;
      }
      case OrderActionTypes.GetOrdersFail: {
        draft.isLoading = false;
        return;
      }
      case OrderActionTypes.ResetOrders: {
        return initialState;
      }
    }
  });
}
