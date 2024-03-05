import {User} from "../../models/user.model";
import {createReducer, on} from "@ngrx/store";

import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  userLists: User[];
  isAuthenticated: boolean;
}

export const initialPostState: AuthState = {
  user: null,
  loading: false,
  userLists: [],
  error: null,
  isAuthenticated: false
}

export const authReducer = createReducer(
  initialPostState,
  on(AuthActions.login, (state) => {
    return {
      ...state,
      loading: true,
      error: null,
      isAuthenticated: false
    }
  }),
  on(AuthActions.loginSuccess, (state, {user}) => {
    return {
      ...state,
      user: user,
      loading: false,
      error: null,
      isAuthenticated: true
    }
  }),
  on(AuthActions.loginFailure, (state, {error}) => {
    return {
      ...state,
      loading: false,
      error: error,
      isAuthenticated: false
    }
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      user: null,
      loading: false,
      error: null,
      isAuthenticated: false
    }
  }),
  on(AuthActions.userLists, (state, {users}) => {
    return {
      ...state,
      userLists: users
    }
  })
)
