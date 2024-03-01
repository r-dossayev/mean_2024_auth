import {PostState} from "./post/post.reducer";
import {AuthState} from "./auth/auth.reducer";


export interface AppState{
  post: PostState;
  auth: AuthState;
}
