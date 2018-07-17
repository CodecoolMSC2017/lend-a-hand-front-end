import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MainPageService {

    constructor(private http: HttpClient) {
    }

    getAds(): Observable<any> {
        return this.http.get('/api/ads/');
    }
}
