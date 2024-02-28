import {Post} from "../../models/post.model";
import {createReducer, on} from "@ngrx/store";

import * as PostActions from './post.actions';

export interface PostState {
  posts: Array<Post>;
  loading: boolean;
  error: string|null;

}

export const initialPostState: PostState = {
  posts: [
{
      id: '1',
      title: 'Post 1',
      content: 'Post 1 Content',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      title: 'Post 2',
      content: 'Post 2 Content',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      title: 'Post 3',
      content: 'Post 3 Content',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '4',
      title: 'Posth 4',
      content: 'Post 4 Content',
      image: 'https://via.placeholder.com/150'
    },
  ],
  loading: false,
  error: null

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
