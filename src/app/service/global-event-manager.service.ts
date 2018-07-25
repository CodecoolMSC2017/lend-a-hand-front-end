import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {KeywordCategoryFilterModel} from '../model/keyword-category-filter.model';
import {Router, Route} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private categoryFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public categoryFilterEmitter: Observable<string> = this.categoryFilterTrigger.asObservable();

    private keywordFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public keywordFilterEmitter: Observable<string> = this.keywordFilterTrigger.asObservable();

    private keywordCategoryFilterTrigger: Subject<KeywordCategoryFilterModel> = new BehaviorSubject<KeywordCategoryFilterModel>(null);
    public keywordCategoryFilterEmitter: Observable<KeywordCategoryFilterModel> = this.keywordCategoryFilterTrigger.asObservable();

    private singleAdTrigger: Subject<Ad> = new BehaviorSubject<Ad>(null);
    public singleAdEmitter: Observable<Ad> = this.singleAdTrigger.asObservable();

    private userTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public userEmitter: Observable<User> = this.userTrigger.asObservable();

    public profileEmitter: Observable<User> = this.userTrigger.asObservable();
    private profileTrigger: Subject<User> = new BehaviorSubject<User>(null);


    public updateCategoryFilter(category: string): void {
        this.categoryFilterTrigger.next(category);
        
    }

    public updateKeywordFilter(keyword: string): void {
        this.keywordFilterTrigger.next(keyword);
    }

    public updateKeywordCategoryFilter(keywordCategoryFilter: KeywordCategoryFilterModel): void {
        this.keywordCategoryFilterTrigger.next(keywordCategoryFilter);
    }


    public updateSingleAd(ad: Ad): void {
        this.singleAdTrigger.next(ad);
        console.log(ad.title);
    }

    public updateUser(user: User): void {
        this.userTrigger.next(user);
    }

    public updateProfile(user: User): void {
        this.profileTrigger.next(user);
    }

    constructor(private router:Router) {
    }
}
