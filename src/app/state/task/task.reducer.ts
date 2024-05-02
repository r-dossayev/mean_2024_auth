import {Task} from "../../models/task.model";
import {createReducer, on} from "@ngrx/store";

import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[],
  loading: boolean,
  error: any,
}

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
}

export const taskReducer = createReducer(
  initialTaskState,
  // on(TaskActions.getTasks, state => ({...state, loading: true})),
  on(TaskActions.taskLists, (state, {tasks}) => ({...state, tasks, loading: false})),
  on(TaskActions.addTask, (state, {task}) => ({...state, tasks: [...state.tasks, task], loading: false})),
  on(TaskActions.deleteTask, (state, {id}) => ({
    ...state,
    tasks: state.tasks.filter(task => task._id !== id),
    loading: false
  })),
  on(TaskActions.updateTask, (state, {task}) => ({
    ...state,
    tasks: state.tasks.map(t => t._id === task._id ? task : t),
    loading: false
  })),
)
