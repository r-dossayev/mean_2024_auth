import {Post} from "../../models/post.model";
import {createReducer, on} from "@ngrx/store";
import {addPost, deletePost} from "./post.actions";


export interface PostState {
  // posts: Array<Post>;
  posts: Array<Post>;
  loading: boolean;
  error: string;

}

export const initialState: PostState = {
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
      title: 'Post 4',
      content: 'Post 4 Content',
      image: 'https://via.placeholder.com/150'
    },
  ],
  loading: false,
  error: ''

}

export const postReducer = createReducer(
  initialState,
  on(addPost, (state, action) => {
      return {
        ...state,
        loading: true
      }
    }
  ),
  on(deletePost, (state, action) => {
      return {
        ...state,
        loading: true
      }
    }
  ),

)
