import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {KeywordCategoryFilterModel} from '../model/keyword-category-filter.model';
import {KeywordTypeFilterModel} from '../model/keyword-type-filter.model';
import {CategoryTypeFilterModel} from '../model/category-type-filter.model';
import {KeywordCategoryTypeFilterModel} from '../model/keyword-category-type-filter.model';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private categoryFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public categoryFilterEmitter: Observable<string> = this.categoryFilterTrigger.asObservable();

    private keywordFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public keywordFilterEmitter: Observable<string> = this.keywordFilterTrigger.asObservable();

    private typeFilterTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public typeFilterEmitter: Observable<string> = this.typeFilterTrigger.asObservable();

    private keywordCategoryFilterTrigger: Subject<KeywordCategoryFilterModel> = new BehaviorSubject<KeywordCategoryFilterModel>(null);
    public keywordCategoryFilterEmitter: Observable<KeywordCategoryFilterModel> = this.keywordCategoryFilterTrigger.asObservable();

    private keywordTypeFilterTrigger: Subject<KeywordTypeFilterModel> = new BehaviorSubject<KeywordTypeFilterModel>(null);
    public keywordTypeFilterEmitter: Observable<KeywordTypeFilterModel> = this.keywordTypeFilterTrigger.asObservable();

    private categoryTypeFilterTrigger: Subject<CategoryTypeFilterModel> = new BehaviorSubject<CategoryTypeFilterModel>(null);
    public categoryTypeFilterEmitter: Observable<CategoryTypeFilterModel> = this.categoryTypeFilterTrigger.asObservable();

    private keywordCategoryTypeFilterTrigger: Subject<KeywordCategoryTypeFilterModel> = new BehaviorSubject<KeywordCategoryTypeFilterModel>(null);
    public keywordCategoryTypeFilterEmitter: Observable<KeywordCategoryTypeFilterModel> = this.keywordCategoryTypeFilterTrigger.asObservable();

    private singleAdTrigger: Subject<Ad> = new BehaviorSubject<Ad>(null);
    public singleAdEmitter: Observable<Ad> = this.singleAdTrigger.asObservable();

    private userTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public userEmitter: Observable<User> = this.userTrigger.asObservable();

    public profileEmitter: Observable<User> = this.userTrigger.asObservable();
    private profileTrigger: Subject<User> = new BehaviorSubject<User>(null);

    constructor(private router: Router) {
    }

    public updateKeywordFilter(keyword: string): void {
        this.keywordFilterTrigger.next(keyword);
    }

    public updateCategoryFilter(category: string): void {
        this.categoryFilterTrigger.next(category);

    }

    public updateKeywordCategoryFilter(keywordCategoryFilter: KeywordCategoryFilterModel): void {
        this.keywordCategoryFilterTrigger.next(keywordCategoryFilter);
    }

    public updateTypeFilter(type: string): void {
        this.typeFilterTrigger.next(type);
    }

    public updateKeywordTypeFilter(keywordTypeFilter: KeywordTypeFilterModel): void {
        this.keywordTypeFilterTrigger.next(keywordTypeFilter);
    }

    public updateCategoryTypeFilter(categoryTypeFilter: CategoryTypeFilterModel): void {
        this.categoryTypeFilterTrigger.next(categoryTypeFilter);
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

    public updateKeywordCategoryTypeFilter(keywordCategoryTypeFilter: KeywordCategoryTypeFilterModel): void {
        this.keywordCategoryTypeFilterTrigger.next(keywordCategoryTypeFilter);
    }
}
