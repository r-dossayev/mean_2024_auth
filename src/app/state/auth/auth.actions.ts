import {createAction, props} from "@ngrx/store";
import {User} from "../../models/user.model";


export const login = createAction('[Auth] Login',
  props<{email:string, password:string}>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{user:User}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{error:string}>()
);

export const logout = createAction(
  '[Auth] Logout'
);

export const userLists = createAction(
  '[Auth] User Lists',
  props<{users:User[]}>()
);


