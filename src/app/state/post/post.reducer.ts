import {Post} from "../../models/post.model";
import {createReducer, on} from "@ngrx/store";

import * as PostActions from './post.actions';

export interface PostState {
  posts: Array<Post>;
  loading: boolean;
  error: string|null;

}

export const initialPostState: PostState = {
  posts: [],
  loading: false,
  error: null,

}

export const postReducer = createReducer(
  initialPostState,
  on(PostActions.loadPostsSuccess, (state, {posts}) => {
    return {
      ...state,
      posts: posts,
      loading: false,
      error: null
    }
  }),
  on(PostActions.loadPostsFailure, (state, {error}) => {
    return {
      ...state,
      loading: false,
      error: error
    }
  }),
  on(PostActions.loadPost, (state) => {
    return {
      ...state,
      loading: true,
      error: null
    }
  })

)
