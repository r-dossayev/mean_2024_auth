import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/post.model";

// export const addPost = createAction('[POST] CREATE_POST',
//   props<{post:Post}>()
//
// )
export const loadPost = createAction('[POST] LOAD_POSTS')
export const loadPostsFailure = createAction('[POST] LOAD_POSTS_FAILURE',
  props<{error: string}>() )
export const loadPostsSuccess = createAction('[POST] LOAD_POSTS_SUCCESS',
  props<{posts: Post[]}>() )
// export const deletePost = createAction('[POST] DELETE_POST',
//   (id: string) => ({id}))
// export const updatePost = createAction('[POST] UPDATE_POST',
//   (post: {id: string, title: string, content: string, image: string}) => ({post}))
