import {Rating} from './rating.model';
import {Application} from './application.model';
import {Ad} from './ad.model';


export class Notification {
    id: number;
    fromId: number;
    fromName: string;
    toId: number;
    toName: string;
    ad: Ad;
    application: Application;
    employeeRating: Rating;
    employerRating: Rating;
    text: string;
    type: string;
    read: boolean;
    timestamp: string;
    formattedTimestamp: string;
    deleted: boolean;
}
