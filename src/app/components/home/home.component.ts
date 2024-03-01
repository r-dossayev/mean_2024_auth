import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {Store} from "@ngrx/store";
import * as PostActions from "../../state/post/post.actions";
import * as PostSelectors from "../../state/post/post.selector";
import * as AuthSelectors from "../../state/auth/auth.selector";
import {PostService} from "../../services/post.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts$!: Observable<Post[]>;
  isAuth$!: Observable<boolean>;
  error$!: Observable<string | null>;
  $authUser!: Observable<User|null>;

  constructor(private store: Store<any>, private postService: PostService) {
    postService.getPosts().subscribe(posts => {
        this.store.dispatch(PostActions.loadPostsSuccess({posts: posts}))
      },
      err => {
        this.store.dispatch(PostActions.loadPostsFailure({error: "Error Loading Posts"}))
      })
    this.posts$ = this.store.select(PostSelectors.selectAllPosts)
    this.error$ = this.store.select(PostSelectors.selectPostError)
    this.isAuth$ = this.store.select(AuthSelectors.selectIsAuthenticated)
    this.$authUser = this.store.select(AuthSelectors.selectAuthUser)

  }

  ngOnInit(): void {
  }

}
