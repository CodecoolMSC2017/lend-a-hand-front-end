import {User} from './user.model';

export class Message {
    id: number;
    sender: User;
    reciever: User;
    text: string;
    timestamp: string;
}