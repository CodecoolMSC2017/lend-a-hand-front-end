import {User} from './user.model';
import {Application} from './application.model';

export class Rating {
    id: number;
    raterName: string;
    ratedName: string;
    rating: number;
    ratingText: string;
    application: Application;
}
