import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../service/user.service';
import {ApplicationService} from '../service/application.service';
import {Application} from '../model/application.model';


@Component({
    selector: 'app-single-ad',
    templateUrl: './single-ad.component.html',
    styleUrls: ['./single-ad.component.css']
})


export class SingleAdComponent implements OnInit, OnDestroy {
    ad: Ad;
    error: string;
    applications: Application[];
    user: User;
    singleAdSub: Subscription;
    ownAd: boolean;
    applicationMessage: string;
    application = new Application();

    constructor(private gem: GlobalEventManagerService, private router: Router, private userService: UserService, private appService: ApplicationService) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('user') !== null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.gem.updateUser(this.user);
        }


        this.singleAdSub = this.gem.singleAdEmitter.subscribe(ad => {
            if (ad) {
                sessionStorage.setItem('ad', JSON.stringify(ad));
                this.ad = ad;
            } else {
                this.ad = JSON.parse(sessionStorage.getItem('ad'));
            }
        });

        if (sessionStorage.getItem('user') !== null) {
            if (this.ad.advertiserId === this.user.id) {
                this.ownAd = true;
            } else {
                this.ownAd = false;
            }
        } else {
            this.ownAd = false;
        }

        this.appService.getApplicationsByAd(this.ad.id).subscribe(applications => {
            this.applications = this.formatApps(applications);
        });

    }

    toProfile(userId) {
        this.userService.getUserById(userId).subscribe(user => {
            this.gem.updateProfile(user);
            this.router.navigate(['profile']);
        }, error => {
            console.log(error);
        });
    }

    applyToAd() {
        if (!this.user.ableToAd) {
            this.router.navigate(['profile']);
        }
        document.getElementById('applicationMessageDiv').classList.remove('hidden');
        document.getElementById('singleAdDiv').classList.add('faded');
    }

    backToAd() {
        document.getElementById('applicationMessageDiv').classList.add('hidden');
        document.getElementById('singleAdDiv').classList.remove('faded');
    }

    sendApplication() {
        if (!this.applicationMessage) {
            this.error = 'Message field is required!';
            this.showError();
            return;
        }
        this.application.adId = this.ad.id;
        this.application.adTitle = this.ad.title;
        this.application.applicantId = this.user.id;
        this.application.applicantName = this.user.userName;
        this.application.message = this.applicationMessage;
        this.application.state = 'Applied';
        this.appService.sendApplication(this.application).subscribe(resopone => {
            this.gem.updateInfo('Application successfully created');
            this.router.navigate(['categories']);
        }, error => {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
            this.showError();
        });
    }

    ngOnDestroy() {
        if (this.singleAdSub) {
            this.singleAdSub.unsubscribe();
        }
    }

    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = '../assets/noImage.jpg';
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
                application.formattedMessage = application.message.substring(0, 200) + '...';
            } else {
                application.formattedMessage = application.message;
            }
            application.formattedTimestamp = this.formatAdsTimestamp(application.timestamp);
            application.timestamp = this.formatAdTimestamp(application.timestamp);
            formattedApps.push(application);
        }
        return formattedApps;
    }

    accept(application: Application) {
        this.appService.acceptApplication(application).subscribe(applications => {
            this.applications = this.formatApps(applications);
        }, error => {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
            this.showError();
        });
    }

    decline(application: Application) {
        this.appService.declineApplication(application).subscribe(applications => {
            this.applications = this.formatApps(applications);
        }, error => {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
            this.showError();
        });
    }


}
