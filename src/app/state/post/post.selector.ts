import {AppState} from "../app.state";
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "./post.reducer";

export const selectPostFeature = createFeatureSelector<PostState>('post');


export const selectAllPosts = createSelector(
  selectPostFeature,
  (state: PostState) => state.posts
);

export const selectPostError = createSelector(
  selectPostFeature,
  (state: PostState) => state.error
);
