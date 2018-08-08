import {User} from './user.model';
import {Message} from './message.model';
import {Ad} from './ad.model';


export class Contact {
    user: User;
    ad: Ad;
    messages: Message[];
    lastMessage: Message;

}
