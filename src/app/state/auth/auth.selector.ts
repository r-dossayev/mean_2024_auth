import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "./auth.reducer";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');


export const selectAuthUser = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.user
)

export const selectIsAuthenticated = createSelector(
  selectAuthFeature,
  (state: AuthState) => state.isAuthenticated
)
