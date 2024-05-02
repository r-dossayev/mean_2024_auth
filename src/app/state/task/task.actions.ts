import {createAction, props} from "@ngrx/store";
import {Task} from "../../models/task.model";

export const addTask = createAction(
  '[TASK] Add Task',
  props<{task:Task}>()
);

export const deleteTask = createAction(
  '[TASK] Delete Task',
  props<{id:string}>()
);

export const updateTask = createAction(
  '[TASK] Update Task',
  props<{task:Task}>()
);

export const getTasks = createAction(
  '[TASK] Get Tasks'
);

export const taskLists = createAction(
  '[TASK] Task Lists',
  props<{tasks:Task[]}>()
);


