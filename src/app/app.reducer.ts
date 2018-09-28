import { ActionReducerMap } from '@ngrx/store';
import {
  State as CartState,
  reducer as CartReducer
} from './cart/store/cart.reducer';
import {
  State as AuthState,
  reducer as AuthReducer
} from './core/store/auth.reducer';

export interface AppState {
  cart: CartState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: CartReducer,
  auth: AuthReducer
};
