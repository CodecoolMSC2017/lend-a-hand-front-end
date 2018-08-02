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
                this.applications = this.formatApps(applications);
                sessionStorage.setItem('applications', JSON.stringify(applications));
            } else {
                this.applications = this.formatApps(JSON.parse(sessionStorage.getItem('applications')));
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

    formatAdTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        let splittedTimestamp = (timestamp + '').split(',');
        formattedTimestamp = formattedTimestamp + this.formatAdsTimestamp(timestamp) + ' ';
        if (splittedTimestamp[3].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[3] + ':';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[3] + ':';
        }
        if (splittedTimestamp[4].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[4];
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[4];
        }
        return formattedTimestamp;
    }

    formatAdsTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        let splittedTimestamp = (timestamp + '').split(',');
        formattedTimestamp = formattedTimestamp + splittedTimestamp[0] + '.';
        if (splittedTimestamp[1].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[1] + '.';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[1] + '.';
        }
        if (splittedTimestamp[2].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[2] + '.';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[2] + '.';
        }
        return formattedTimestamp;
    }

    formatApps(applications: Application[]): Application[] {
        const formattedApps = [];
        for (let i = 0; i < applications.length; i++) {
            const application = applications[i];
            if (application.message.length > 85) {
                application.formattedMessage = application.message.substring(0, 85) + '...';
            } else {
                application.formattedMessage = application.message;
            }
            application.formattedTimestamp = this.formatAdsTimestamp(application.timestamp);
            application.timestamp = this.formatAdTimestamp(application.timestamp);
            formattedApps.push(application);
        }
        return formattedApps;
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    }

}
