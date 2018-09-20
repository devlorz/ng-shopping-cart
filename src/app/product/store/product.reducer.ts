import { produce } from 'immer';

import { Product } from './../product.model';
import { ProductActions, ProductActionTypes } from './product.action';

export interface State {
  products: Array<Product>;
}

const initialState: State = {
  products: []
};

export const reducer = produce<State, ProductActions>((draft, action) => {
  switch (action.type) {
    case ProductActionTypes.SET_ALL_PRODUCTS: {
      draft.products = action.payload;
      return;
    }
  }
}, initialState);
