import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../model/application.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';
import {AdService} from '../service/ad.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

    applications: Application[];
    applicationSub: Subscription;

    constructor(private gem: GlobalEventManagerService, private adService: AdService, private router: Router) {
    }

    ngOnInit() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(user);
        this.applicationSub = this.gem.applicationsEmitter.subscribe(applications => {
            if (applications) {
                this.applications = applications;
                sessionStorage.setItem('applications', JSON.stringify(applications));
            } else {
                this.applications = JSON.parse(sessionStorage.getItem('applications'));
            }
        });
    }

    toAd(adId: number) {
        this.adService.getAdById(adId).subscribe(ad => {
            if (ad) {
                this.gem.updateSingleAd(ad);
                this.router.navigate(['ad']);
            }

        });
    }

    ngOnDestroy(): void {
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
    }

}
