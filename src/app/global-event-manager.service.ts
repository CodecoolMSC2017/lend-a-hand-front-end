import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject, Observable} from 'rxjs';
import {Ad} from './ad.model';
import {User} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private categoryFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public categoryFilterEmitter: Observable<string> = this.categoryFilterTrigger.asObservable();

    private keywordFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public keywordFilterEmitter: Observable<string> = this.keywordFilterTrigger.asObservable();

    private singleAdTrigger: Subject<Ad> = new BehaviorSubject<Ad>(null);
    public singleAdEmitter: Observable<Ad> = this.singleAdTrigger.asObservable();

    private userTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public userEmitter: Observable<User> = this.userTrigger.asObservable();

    public updateCategoryFilter(category: string): void {
        this.categoryFilterTrigger.next(category);
    }

    public updateKeywordFilter(keyword: string): void {
        this.keywordFilterTrigger.next(keyword);
    }

    public updateSingleAd(ad:Ad): void {
        this.singleAdTrigger.next(ad);
        console.log(ad.title);
        
    }

    public updateUser(user:User): void{
        this.userTrigger.next(user);
    }

    constructor() {
    }
}
