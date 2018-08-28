import {Message} from './message.model';
import {Application} from './application.model';
import {Ad} from './ad.model';

export class User {
    id: number;
    ads: Ad[];
    hasPaid : boolean;
    authorities = [];
    employeeRatings = [];
    employerRatings = [];
    ratedEmployees = [];
    ratedEmployers = [];
    applications: Application[];
    sentMessages: Message[];
    receivedMessages: Message[];
    employerRatingScore: number;
    employeeRatingScore: number;
    email: string;
    phone: string;
    userName: string;
    password: string;
    fullName: string;
    type: string;
    postalCode: string;
    city: string;
    address: string;
    balance: number;
    reported: number;
    blocked: boolean;
    ableToAd: boolean;
    enabled: boolean;
    verificated: boolean;
    pictureLink: string;
    contacts: User[];
}
