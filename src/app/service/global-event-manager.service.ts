import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {KeywordCategoryFilterModel} from '../model/keyword-category-filter.model';
import {KeywordTypeFilterModel} from '../model/keyword-type-filter.model';
import {CategoryTypeFilterModel} from '../model/category-type-filter.model';
import {KeywordCategoryTypeFilterModel} from '../model/keyword-category-type-filter.model';
import {Router} from '@angular/router';
import {FilterSettingsModel} from '../model/filter-settings.model';


@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private filterSettingsTrigger: Subject<FilterSettingsModel> = new Subject<FilterSettingsModel>();
    public filterSettingsEmitter: Observable<FilterSettingsModel> = this.filterSettingsTrigger.asObservable();

    private noFilterTrigger: Subject<string> = new Subject<string>();
    public noFilterEmitter: Observable<string> = this.noFilterTrigger.asObservable();

    private keywordFilterTrigger: Subject<string> = new Subject<string>();
    public keywordFilterEmitter: Observable<string> = this.keywordFilterTrigger.asObservable();

    private categoryFilterTrigger: Subject<string> = new Subject<string>();
    public categoryFilterEmitter: Observable<string> = this.categoryFilterTrigger.asObservable();

    private typeFilterTrigger: Subject<string> = new Subject<string>();
    public typeFilterEmitter: Observable<string> = this.typeFilterTrigger.asObservable();

    private keywordCategoryFilterTrigger: Subject<KeywordCategoryFilterModel> = new Subject<KeywordCategoryFilterModel>();
    public keywordCategoryFilterEmitter: Observable<KeywordCategoryFilterModel> = this.keywordCategoryFilterTrigger.asObservable();

    private keywordTypeFilterTrigger: Subject<KeywordTypeFilterModel> = new Subject<KeywordTypeFilterModel>();
    public keywordTypeFilterEmitter: Observable<KeywordTypeFilterModel> = this.keywordTypeFilterTrigger.asObservable();

    private categoryTypeFilterTrigger: Subject<CategoryTypeFilterModel> = new Subject<CategoryTypeFilterModel>();
    public categoryTypeFilterEmitter: Observable<CategoryTypeFilterModel> = this.categoryTypeFilterTrigger.asObservable();

    private keywordCategoryTypeFilterTrigger: Subject<KeywordCategoryTypeFilterModel>
        = new Subject<KeywordCategoryTypeFilterModel>();
    public keywordCategoryTypeFilterEmitter: Observable<KeywordCategoryTypeFilterModel>
        = this.keywordCategoryTypeFilterTrigger.asObservable();

    private singleAdTrigger: Subject<Ad> = new Subject<Ad>();
    public singleAdEmitter: Observable<Ad> = this.singleAdTrigger.asObservable();

    private userTrigger: Subject<User> = new Subject<User>();
    public userEmitter: Observable<User> = this.userTrigger.asObservable();

    private profileTrigger: Subject<User> = new Subject<User>();
    public profileEmitter: Observable<User> = this.profileTrigger.asObservable();


    private infoTrigger: Subject<string> = new Subject<string>();
    public infoEmitter: Observable<string> = this.infoTrigger.asObservable();


    constructor(private router: Router) {
    }

    public updateFilterSettings(filterSettings: FilterSettingsModel) {
        this.filterSettingsTrigger.next(filterSettings);
    }

    public resetFilterSettings() {
        this.updateFilterSettings(new FilterSettingsModel());
    }

    public updateNoFilter(info: string): void {
        this.noFilterTrigger.next(info);

    }

    public updateKeywordFilter(keyword: string): void {
        this.keywordFilterTrigger.next(keyword);
    }

    public updateCategoryFilter(category: string): void {
        console.log("AAAAAA")
        this.categoryFilterTrigger.next(category);

    }

    public updateTypeFilter(type: string): void {
        this.typeFilterTrigger.next(type);
    }

    public updateKeywordCategoryFilter(keywordCategoryFilter: KeywordCategoryFilterModel): void {
        console.log("BBBBB");
        this.keywordCategoryFilterTrigger.next(keywordCategoryFilter);
    }

    public updateKeywordTypeFilter(keywordTypeFilter: KeywordTypeFilterModel): void {
        this.keywordTypeFilterTrigger.next(keywordTypeFilter);
    }

    public updateCategoryTypeFilter(categoryTypeFilter: CategoryTypeFilterModel): void {
        this.categoryTypeFilterTrigger.next(categoryTypeFilter);
    }

    public updateKeywordCategoryTypeFilter(keywordCategoryTypeFilter: KeywordCategoryTypeFilterModel): void {
        this.keywordCategoryTypeFilterTrigger.next(keywordCategoryTypeFilter);
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

    public updateInfo(info: string): void {
        this.infoTrigger.next(info);
    }
}
