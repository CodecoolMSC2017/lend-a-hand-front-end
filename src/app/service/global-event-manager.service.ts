import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Ad} from "../model/ad.model";
import {User} from "../model/user.model";
import {Router} from "@angular/router";
import {FilterSettingsModel} from "../model/filter-settings.model";
import {Application} from "../model/application.model";


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

    private applicationTrigger: Subject<Application> = new BehaviorSubject<Application>(null);
    public applicationEmitter: Observable<Application> = this.applicationTrigger.asObservable();

    private infoTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public infoEmitter: Observable<string> = this.infoTrigger.asObservable();

    private ratingTypeTrigger: Subject<string> = new BehaviorSubject<string>(null);
    public ratingTypeEmitter: Observable<string> = this.ratingTypeTrigger.asObservable();

    private applicationsTrigger: Subject<Application[]> = new BehaviorSubject<Application[]>(null);
    public applicationsEmitter: Observable<Application[]> = this.applicationsTrigger.asObservable();

    private reportedUserTrigger: Subject<User> = new BehaviorSubject<User>(null);
    public reportedUserEmitter: Observable<User> = this.reportedUserTrigger.asObservable();

    private reportedAdTrigger: Subject<Ad> = new BehaviorSubject<Ad>(null);
    public reportedAdEmitter: Observable<Ad> = this.reportedAdTrigger.asObservable();


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

    public updateApplication(application: Application): void {
        this.applicationTrigger.next(application);
    }

    public updateInfo(info: string): void {
        this.infoTrigger.next(info);
    }

    public updateRatingType(ratingType: string): void {
        this.ratingTypeTrigger.next(ratingType);
    }

    public updateApplications(applications: Application[]): void {
        this.applicationsTrigger.next(applications);
    }

    public updateReportedUser(reportedUser: User): void {
        this.reportedUserTrigger.next(reportedUser);
    }

    public updateReportedAd(reportedAd: Ad): void {
        this.reportedAdTrigger.next(reportedAd);
    }
}
