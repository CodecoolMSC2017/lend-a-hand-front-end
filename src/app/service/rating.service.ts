import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams}from '@angular/common/http';
import {Rating} from '../model/rating.model';


@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  public getRatingsAboutMe(id): Observable<any> {
    return this.http.get('/api/ratings/ratingsaboutme/' + id);
  }

  public getRatings(id): Observable<any> {
    return this.http.get('/api/ratings/myratings/' + id);

  }

}
