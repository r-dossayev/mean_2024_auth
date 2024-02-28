import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectPostState = (state: AppState) => state.postState;

// export const selectPosts = createSelector(
//   selectPostState,
//   (state) => state.posts
// );

export const selectPosts = createSelector(
  (state: AppState) => state.postState.posts,
  (posts) =>posts
  // (state) => state.posts
);
