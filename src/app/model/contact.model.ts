import {User} from './user.model';
import {Message} from './message.model';
import {Ad} from './ad.model';
import {Application} from './application.model';


export class Contact {
    user: User;
    ad: Ad;
    application: Application;
    messages: Message[];
    lastMessage: Message;

}
