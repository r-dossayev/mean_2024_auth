import {inject, Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {TaskService} from "../../services/task.service";

@Injectable()
export class TaskEffect {
  private api = inject(TaskService);
  action$ = inject(Actions);

}
