import {PostState} from "./post/post.reducer";
import {AuthState} from "./auth/auth.reducer";
import {OtherState} from "./other/other.reducer";
import {TaskState} from "./task/task.reducer";


export interface AppState {
  post: PostState;
  auth: AuthState;
  task: TaskState;
  other: OtherState;

}
