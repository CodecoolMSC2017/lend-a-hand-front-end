import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ad} from '../model/ad.model';
import {UserAd} from '../model/user-ad.model';

@Injectable({
    providedIn: 'root'
})
export class AdService {

    constructor(private http: HttpClient) {
    }

    public getAds(): Observable<Ad[]> {
        return this.http.get<Ad[]>('/api/ads');
    }

    public getAdsByAdvertiser(id: number): Observable<Ad[]> {
        return this.http.get<Ad[]>('/api/ads/advertisers/' + id);
    }

    public getAdsByFilter(keyword: string, category: string, type: string): Observable<Ad[]> {
        const params = new HttpParams().append('keyword', keyword).append('category', category).append('type', type);
        return this.http.get<Ad[]>('/api/ads/filters', {params: params});
    }

    public getAdById(id: number): Observable<Ad> {
        return this.http.get<Ad>('/api/ads/' + id);
    }

    public deleteAdById(id: number): Observable<any> {
        return this.http.delete('/api/ads/delete/' + id);
    }

    public createAd(ad: Ad): Observable<any> {
        return this.http.post('/api/ads/new', ad);
    }

    public blockAd(id: number): Observable<any> {
        return this.http.put('/api/ads/block/' + id, null);
    }

    public makePremium(ad: Ad): Observable<UserAd> {
        return this.http.put<UserAd>('/api/ads/premium/', ad);
    }
}
