import { produce } from 'immer';

import { Product } from './../product.model';
import { ProductActions, ProductActionTypes } from './product.action';

export interface State {
  products: Array<Product>;
  isLoading: boolean;
}

const initialState: State = {
  products: [],
  isLoading: false
};

export function reducer(state = initialState, action: ProductActions) {
  return produce(state, draft => {
    switch (action.type) {
      case ProductActionTypes.GetProducts: {
        draft.isLoading = true;
        break;
      }
      case ProductActionTypes.GetProductsSuccess: {
        draft.products = action.payload;
        draft.isLoading = false;
        break;
      }
      case ProductActionTypes.GetProductsFail: {
        draft.isLoading = false;
        break;
      }
    }
  });
}
