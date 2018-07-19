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

    public getAds(): Observable<Ad[]> {
        return this.http.get<Ad[]>('/api/ads');
    }

    public getAdsByAdvertiser(id: number): Observable<Ad[]> {
        return  this.http.get<Ad[]>('/api/ads/advertisers/' + id);
    }

    public getAdsByCategory(category: string): Observable<Ad[]> {
        
        return  this.http.get<Ad[]>('/api/ads/categories/' + category);
        
    }


    public getAdsByKeyword(keyword: string): Observable<Ad[]> {
        return  this.http.get<Ad[]>('/api/ads/keywords/' + keyword);
    }

    public getAdById(id: number): Observable<Ad[]> {
        return  this.http.get<Ad[]>('/api/ads/' + id);
    }

    public deleteAdById(id: number): void {
        this.http.delete('/api/ads/delete/' + id);
    }

    public createAd(ad: Ad): Observable<any> {
        return this.http.post('/api/ads/new', ad);
    }

    public updateAdById(ad: Ad): Observable<any> {
        return this.http.put('/api/ads/update', ad);
    }
}
