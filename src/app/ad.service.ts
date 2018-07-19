import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Ad} from './ad.model';

@Injectable({
    providedIn: 'root'
})
export class AdService {

    ads: Observable<Ad[]>;

    constructor(private http: HttpClient) {
    }

    public getAds(): void {
        this.ads = this.http.get<Ad[]>('/api/ads');
        console.log(this.ads);
    }

    public getAdsByAdvertiser(id: number): void {
        this.ads = this.http.get<Ad[]>('/api/ads/advertisers/' + id);
    }

    public getAdsByCategory(category: string): void {
        this.ads = this.http.get<Ad[]>('/api/ads/categories/' + category);
        console.log(this.ads);
        
    }


    public getAdsByKeyword(keyword: string): void {
        this.ads = this.http.get<Ad[]>('/api/ads/keywords/' + keyword);
    }

    public getAdById(id: number): Observable<Ad[]> {
        return this.ads = this.http.get<Ad[]>('/api/ads/' + id);
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
