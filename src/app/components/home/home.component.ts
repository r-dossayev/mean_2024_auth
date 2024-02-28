import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {AppState} from "../../state/app.state";
import {select, Store} from "@ngrx/store";
import * as PostActions from "../../state/post/post.actions";
import * as PostSelectors from "../../state/post/post.selector";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts$!: Observable<Post[]>;
  error$!: Observable<string | null>;

  constructor(private store: Store<{ postSlice: { posts: Post[] } }>, private postService: PostService) {
    postService.getPosts().subscribe(posts => {
        this.store.dispatch(PostActions.loadPostsSuccess({posts: posts}))
      },
      err => {
        this.store.dispatch(PostActions.loadPostsFailure({error: "Error Loading Posts"}))
      })
    this.posts$ = this.store.select(PostSelectors.selectAllPosts)
    this.error$ = this.store.select(PostSelectors.selectPostError)
  }

  ngOnInit(): void {
  }

  addPost() {
    console.log('Add Post')
  }

  deletePost() {
    console.log('Delete Post')
  }

  updatePost() {
    console.log('Update Post')
  }

  getPosts() {
    console.log('Get Posts')
  }
}
