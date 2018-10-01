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

export const reducer = produce<State, AuthActions>((draft, action) => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.GetUserSuccess: {
      draft.user = action.user;
      draft.loggedIn = true;
      draft.isLoading = false;
      return;
    }
    case AuthActionTypes.GetUser: {
      draft.isLoading = true;
      return;
    }
    case AuthActionTypes.GetUserFailure: {
      draft.isLoading = false;
      return;
    }
    case AuthActionTypes.Logout: {
      return initialState;
    }
  }
}, initialState);
