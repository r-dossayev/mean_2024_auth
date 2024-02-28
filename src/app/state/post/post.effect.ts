import {inject, Injectable} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as PostActions from './post.actions';
import {catchError, map, of, switchMap} from "rxjs";
import {Post} from "../../models/post.model";
@Injectable()
export class PostEffect {
  private api = inject(PostService);
  action$ = inject(Actions);


  loadPosts$ = createEffect(
    () => this.action$.pipe(ofType(PostActions.loadPost),
      switchMap(() => this.api.getPosts().pipe(
        map((posts:Post[]) => PostActions.loadPostsSuccess({posts:posts})),
        catchError(error => of(PostActions.loadPostsFailure({error:"Error Loading Posts"})))
      ))
    ),

  )
}
