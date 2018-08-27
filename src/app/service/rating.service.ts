import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Rating} from '../model/rating.model';


@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private http: HttpClient) {
    }

    public getRatingsAboutMe(id): Observable<any> {
        return this.http.get('/api/ratings/ratingsaboutme/' + id);
    }

    public getRatings(id): Observable<any> {
        return this.http.get('/api/ratings/myratings/' + id);

    }

    public createRating(rating: Rating): Observable<any> {
        return this.http.post('/api/ratings/new', rating);
    }

    getIsRated(userId: number, applicationId: number): Observable<any> {
        const params = new HttpParams().append('userId', userId.toString()).append('applicationId', applicationId.toString());
        return this.http.get('/api/ratings/rated', {params: params});
    }

}
