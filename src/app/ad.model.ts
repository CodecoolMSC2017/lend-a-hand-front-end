import {User} from './user.model';

export class Ad {
    id: number;
    advertiser: User;
    chosenApplicant: User;
    applications: [];
    title: string;
    description: string;
    payment: number;
    category: string;
    isPremium: boolean;
}
