import { createEntityAdapter, EntityState } from '@ngrx/entity';
import produce from 'immer';

import { CartItem } from './../cart.model';
import { CartActions, CartActionTypes } from './cart.action';

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cart: CartItem) => cart.productId
});

export interface State extends EntityState<CartItem> {
  isloading: boolean;
  errorMessage: string;
}

export enum ErrorMessage {
  NotLogin = 'Not Login'
}

const initialState = cartAdapter.getInitialState({
  isloading: false,
  errorMessage: ''
});

export function reducer(state = initialState, action: CartActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CartActionTypes.AddItem: {
        const ids = draft.ids as Array<number | string>;
        if (ids.includes(action.payload.productId)) {
          draft.entities[action.payload.productId].quantity +=
            action.payload.quantity;
          break;
        } else {
          return cartAdapter.addOne(action.payload, state);
        }
      }
      case CartActionTypes.AdjustQuantity: {
        const ids = state.ids as Array<number | string>;
        if (ids.includes(action.payload.id)) {
          draft.entities[action.payload.id].quantity = action.payload.quantity;
          break;
        }
        break;
      }
      case CartActionTypes.RemoveItem: {
        const ids = state.ids as Array<number | string>;
        if (ids.includes(action.payload)) {
          return cartAdapter.removeOne(action.payload, state);
        }
        break;
      }
      case CartActionTypes.ConfirmOrder: {
        draft.isloading = true;
        break;
      }
      case CartActionTypes.ConfirmOrderSuccess: {
        return initialState;
      }
      case CartActionTypes.ConfirmOrderFail: {
        if (action.payload && action.payload === ErrorMessage.NotLogin) {
          draft.errorMessage = 'You need to login for confirming order';
        }
        draft.isloading = false;
        break;
      }
      case CartActionTypes.GetCartItemSuccess: {
        return cartAdapter.addAll(action.payload.carts, state);
      }
      case CartActionTypes.ResetCart: {
        return initialState;
      }
      case CartActionTypes.ResetErrorMessage: {
        draft.errorMessage = '';
        break;
      }
    }
  });
}

const { selectEntities, selectAll } = cartAdapter.getSelectors();

export const selectCartEntities = selectEntities;
export const selectAllCartItems = selectAll;
