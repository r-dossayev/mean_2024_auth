import {inject, Injectable} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as OtherActions from './other.actions';
import {catchError, map, of, switchMap} from "rxjs";
import {Chat} from "../../models/chat.model";
import {UserService} from "../../services/user.service";

@Injectable()
export class PostEffect {
    private api = inject(UserService);
    action$ = inject(Actions);


    loadPosts$ = createEffect(
        () => this.action$.pipe(ofType(OtherActions.loadChats),
            switchMap(() => this.api.getUserChats("w").pipe(
                map((chats: Chat[]) => OtherActions.loadChatsSuccess({chats: chats})),
                catchError(error => of(OtherActions.loadChatsFailure({error: "Error Loading Posts"})))
            ))
        ),
    )
}
