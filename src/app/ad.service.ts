import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ad} from './ad.model';

@Injectable({
    providedIn: 'root'
})
export class AdService {

    constructor(private http: HttpClient) {
    }

    public getAds(): Observable<any> {
        return this.http.get('/api/ads');
    }

    public getAdsByAdvertiser(id: number): Observable<any> {
        return this.http.get('/api/ads/advertisers/' + id);
    }

    public getAdsByCategory(category: string): Observable<any> {
        return this.http.get('/api/ads/categories/' + category);
    }


    public getAdsByKeyword(keyword: string): Observable<any> {
        return this.http.get('/api/ads/keywords/' + keyword);
    }

    public getAdById(id: number): Observable<any> {
        return this.http.get('/api/ads/' + id);
    }

    public deleteAdById(id: number): Observable<any> {
        return this.http.delete('/api/ads/delete/' + id);
    }

    public createAd(ad: Ad) {
        return this.http.post('/api/ads/new', ad);
    }

    public updateAdById(ad: Ad) {
        return this.http.put('/api/ads/update', ad);
    }
}
