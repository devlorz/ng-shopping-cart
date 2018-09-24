import { createEntityAdapter, EntityState } from '@ngrx/entity';
import produce from 'immer';

import { CartActions, CartActionTypes } from './cart.action';
import { CartItem } from './../cart.model';

const cartAdapter = createEntityAdapter<CartItem>({
  selectId: (cart: CartItem) => cart.productId
});

export interface State extends EntityState<CartItem> {}

const initialState = cartAdapter.getInitialState();

export const reducer = produce<State, CartActions>((draft, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ONE: {
      const ids = draft.ids as Array<number | string>;
      if (ids.includes(action.payload.productId)) {
        const item = draft.entities[action.payload.productId];
        item.quantity += 1;
        draft.entities[action.payload.productId] = item;
        return;
      } else {
        return cartAdapter.addOne(action.payload, draft);
      }
    }
  }
}, initialState);

const { selectEntities } = cartAdapter.getSelectors();

export const selectCartEntities = selectEntities;
