import { createEntityAdapter, EntityState, Dictionary } from '@ngrx/entity';
import produce from 'immer';

import { CartActions, CartActionTypes } from './cart.action';
import { CartItem } from './../cart.model';

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cart: CartItem) => cart.productId
});

export interface State extends EntityState<CartItem> {
  isloading: boolean;
}

const initialState = cartAdapter.getInitialState({
  isloading: false
});

export const reducer = produce<State, CartActions>((draft, action) => {
  switch (action.type) {
    case CartActionTypes.AddItem: {
      const ids = draft.ids as Array<number | string>;
      if (ids.includes(action.payload.productId)) {
        draft.entities[action.payload.productId].quantity +=
          action.payload.quantity;
        return;
      } else {
        return cartAdapter.addOne(action.payload, draft);
      }
    }
    case CartActionTypes.AdjustQuantity: {
      const ids = draft.ids as Array<number | string>;
      if (ids.includes(action.payload.id)) {
        draft.entities[action.payload.id].quantity = action.payload.quantity;
        return;
      }
      return;
    }
    case CartActionTypes.RemoveItem: {
      const ids = draft.ids as Array<number | string>;
      if (ids.includes(action.payload)) {
        return cartAdapter.removeOne(action.payload, draft);
      }
      return;
    }
    case CartActionTypes.ConfirmOrder: {
      draft.isloading = true;
      return;
    }
    case CartActionTypes.ConfirmOrderSuccess: {
      return initialState;
    }
    case CartActionTypes.ConfirmOrderFail: {
      draft.isloading = false;
      return;
    }
    case CartActionTypes.GetCartItemSuccess: {
      draft.ids = action.payload.carts.map(cart => cart.productId);
      draft.entities = action.payload.carts.reduce(
        (acc, cur) => {
          acc[cur.productId] = cur;
          return acc;
        },
        {} as Dictionary<CartItem>
      );
      break;
    }
    case CartActionTypes.ResetCart: {
      return initialState;
    }
  }
}, initialState);

const { selectEntities, selectAll } = cartAdapter.getSelectors();

export const selectCartEntities = selectEntities;
export const selectAllCartItems = selectAll;
