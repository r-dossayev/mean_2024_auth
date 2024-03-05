import {PostState} from "./post/post.reducer";
import {AuthState} from "./auth/auth.reducer";
import {OtherState} from "./other/other.reducer";


export interface AppState {
  post: PostState;
  auth: AuthState;
  other: OtherState;
}
