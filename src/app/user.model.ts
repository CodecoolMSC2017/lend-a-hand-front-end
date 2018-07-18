import {Ad} from './ad.model';

export class User {
    id: number;
    ads: Array<Ad>;
    authorities= [];
    employeeRatings= [];
    employerRatings= [];
    ratedEmployees= [];
    ratedEmployers= [];
    applications= [];
    sentMessages= [];
    receivedMessages= [];
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
}
