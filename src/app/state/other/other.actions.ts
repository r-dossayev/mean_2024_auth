import {createAction, props} from "@ngrx/store";
import {Chat} from "../../models/chat.model";
import {User} from "../../models/user.model";



export const loadChats = createAction('[Chat] Load Chats');
export const loadChatsSuccess = createAction('[Chat] Load Chats Success',
  props<{chats:Chat[]}>()
);
export const loadChatsFailure = createAction('[Chat] Load Chats Failure',
  props<{error:string}>()
);
export const createChat = createAction('[Chat] Create Chat',
  props<{chat:Chat}>()
);

export const selectUser = createAction('[Chat] Select User',
  props<{user:User}>()
);

export const setJoinRoom = createAction('[Chat] Join Room',
  props<{roomId:string}>()
);



