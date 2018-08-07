import {User} from './user.model';

export class Message {
    id: number;
    senderId: number;
    recieverId: number;
    text: string;
    timestamp: string;
}