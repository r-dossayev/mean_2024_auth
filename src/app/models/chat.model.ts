import {User} from "./user.model";


export interface Chat {
    _id: string;
    // sender: User;
    // receiver: User;
    senderId: string;
    receiverId: string
    message: string;
    image: string|null;
    // isRead: boolean;
    createdAt: Date;
}
