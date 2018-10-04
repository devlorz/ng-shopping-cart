import produce from 'immer';
import { User } from '../user.model';
import { AuthActionTypes, AuthActions } from './auth.action';

export interface State {
  loggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  isLoading: false
};

export function reducer(state = initialState, action: AuthActions) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActionTypes.LoginSuccess:
      case AuthActionTypes.GetUserSuccess: {
        draft.user = action.user;
        draft.loggedIn = true;
        draft.isLoading = false;
        break;
      }
      case AuthActionTypes.GetUser: {
        draft.isLoading = true;
        break;
      }
      case AuthActionTypes.GetUserFailure: {
        draft.isLoading = false;
        break;
      }
      case AuthActionTypes.Logout: {
        draft.isLoading = true;
        break;
      }
      case AuthActionTypes.LogoutSuccess: {
        return initialState;
      }
      case AuthActionTypes.LogoutFailure: {
        draft.isLoading = false;
        break;
      }
    }
  });
}
