import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {AppState} from "../../state/app.state";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
posts$!: Observable<Array<Post>>;

  constructor(private store: Store<AppState>,) {
    this.posts$ = this.store.select(state => state.postState.posts);
    console.log(this.posts$)
  }

  ngOnInit(): void {
  }

  addPost(){
    console.log('Add Post')
  }

  deletePost(){
    console.log('Delete Post')
  }

  updatePost(){
    console.log('Update Post')
  }

  getPosts(){
    console.log('Get Posts')
  }
}
