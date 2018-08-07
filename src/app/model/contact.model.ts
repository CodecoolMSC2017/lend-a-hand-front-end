import {User} from './user.model';
import {Message} from './message.model';


export class Contact {
    user: User;
    messages: Message[];
    lastMessage: Message;
}
