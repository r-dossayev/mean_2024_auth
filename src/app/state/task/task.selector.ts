import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "./task.reducer";

export const selectTaskFeature = createFeatureSelector<TaskState>('task');


export const selectTaskList = createSelector(
  selectTaskFeature,
  (state: TaskState) => state.tasks
)
