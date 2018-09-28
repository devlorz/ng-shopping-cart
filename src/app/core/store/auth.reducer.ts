import produce from 'immer';
import { User } from '../user.model';
import { AuthActionTypes, AuthActions } from './auth.action';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null
};

export const reducer = produce<State, AuthActions>((draft, action) => {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
    case AuthActionTypes.GetUserSuccess: {
      draft.user = action.user;
      draft.loggedIn = true;
      return;
    }
    case AuthActionTypes.Logout: {
      return initialState;
    }
  }
}, initialState);
