import {createFeatureSelector, createSelector} from "@ngrx/store";
import {OtherState} from "./other.reducer";

export const selectAuthFeature = createFeatureSelector<OtherState>('other');




export const selectChats = createSelector(
  selectAuthFeature,
  (state: OtherState) => state.chats
);

export const selectSelectedUser = createSelector(
  selectAuthFeature,
  (state: OtherState) => state.selectedUser
);

export const selectRoomId = createSelector(
  selectAuthFeature,
  (state: OtherState) => state.chatRoom
);
