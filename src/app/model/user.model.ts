export class User {
    id: number;
    ads = [];
    authorities = [];
    employeeRatings = [];
    employerRatings = [];
    ratedEmployees = [];
    ratedEmployers = [];
    applications = [];
    sentMessages = [];
    receivedMessages = [];
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
}
