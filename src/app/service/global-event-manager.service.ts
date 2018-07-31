import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {FilterSettingsModel} from '../model/filter-settings.model';


@Injectable({
    providedIn: 'root'
})
export class GlobalEventManagerService {

    private filterSettingsTrigger: Subject<FilterSettingsModel> = new BehaviorSubject<FilterSettingsModel>(null);
    public filterSettingsEmitter: Observable<FilterSettingsModel> = this.filterSettingsTrigger.asObservable();

    private singleAdTrigger: Subject<Ad> = new BehaviorSubject<Ad>(null);
    public singleAdEmitter: Observable<Ad> = this.singleAdTrigger.asObservable();

    private userTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public userEmitter: Observable<User> = this.userTrigger.asObservable();

    private profileTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public profileEmitter: Observable<User> = this.profileTrigger.asObservable();


    private infoTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public infoEmitter: Observable<string> = this.infoTrigger.asObservable();

    private ratingTypeTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public ratingTypeEmitter: Observable<string> = this.ratingTypeTrigger.asObservable();


    constructor(private router: Router) {
    }

    public updateFilterSettings(filterSettings: FilterSettingsModel) {
        this.filterSettingsTrigger.next(filterSettings);
    }

    public updateSingleAd(ad: Ad): void {
        this.singleAdTrigger.next(ad);
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

    public updateRatingType(ratingType: string): void {
        this.ratingTypeTrigger.next(ratingType);
    }

}
