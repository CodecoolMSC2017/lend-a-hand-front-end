import {User} from './user.model';

export class Rating {
    id: number;
    rater: User;
    rated: User;
    rating: number;
}
