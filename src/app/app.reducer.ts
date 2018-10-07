import { ActionReducerMap } from '@ngrx/store';

import {
  reducer as CartReducer,
  State as CartState
} from './cart/store/cart.reducer';
import {
  reducer as AuthReducer,
  State as AuthState
} from './core/store/auth.reducer';

export interface AppState {
  cart: CartState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: CartReducer,
  auth: AuthReducer
};
