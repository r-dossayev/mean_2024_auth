import {inject, Injectable} from "@angular/core";
import {PostService} from "../../services/post.service";
import {Actions} from "@ngrx/effects";

@Injectable()
export class AuthEffect {
  private api = inject(PostService);
  action$ = inject(Actions);

}
