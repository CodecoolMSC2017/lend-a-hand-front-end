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
    createAdError: string;
    applications: Application[];
    user: User;
    singleAdSub: Subscription;
    ownAd: boolean;
    applicationMessage: string;
    application = new Application();
    loaded: boolean;

    constructor(private gem: GlobalEventManagerService, private router: Router, private userService: UserService,
                private appService: ApplicationService) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('user') !== null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
            this.gem.updateUser(this.user);
        }


        this.singleAdSub = this.gem.singleAdEmitter.subscribe(ad => {
            if (ad) {
                sessionStorage.setItem('ad', JSON.stringify(ad));
                this.ad = this.formatAd(ad);
                this.loaded = true;
            } else {
                this.ad = this.formatAd(JSON.parse(sessionStorage.getItem('ad')));
                this.loaded = true;
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
        }, error => {
            this.handleError(error);
        });

    }

    toProfile(userId) {
        this.userService.getUserById(userId).subscribe(user => {
            this.gem.updateProfile(user);
            this.router.navigate(['profile']);
        }, error => {
            this.handleError(error);
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
            this.handleCreateAdError(error);
        });
    }

    formatAdTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        const splittedTimestamp = (timestamp + '').split(',');
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
        const splittedTimestamp = (timestamp + '').split(',');
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

    formatAd(ad: Ad) {
        ad.formattedTimestamp = this.formatAdTimestamp(ad.timestamp);
        return ad;
    }

    formatApps(applications: Application[]): Application[] {
        const formattedApps = [];
        for (let i = 0; i < applications.length; i++) {
            const application = applications[i];
            if (application.message.length > 100) {
                application.formattedMessage = application.message.substring(0, 100) + '...';
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
            this.handleError(error);
        });
    }

    decline(application: Application) {
        this.appService.declineApplication(application).subscribe(applications => {
            this.applications = this.formatApps(applications);
        }, error => {
            this.handleError(error);
        });
    }

    toReport() {
        this.gem.updateReportedAd(this.ad);
        this.router.navigate(['report']);
    }


    handleError(error) {
        if (error.status === 401) {
            this.router.navigate(['login']);
        } else {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
        }
        this.showError();
    }

    clearAlert() {
        this.error = '';
        document.getElementById('errorDiv').innerText = '';
        document.getElementById('errorDiv').classList.add('hidden');
    }

    showError() {
        document.getElementById('errorDiv').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }


    handleCreateAdError(error) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.gem.updateUser(null);
            this.router.navigate(['login']);
        } else {
            if (error.error !== null) {
                this.createAdError = error.error.message;
            } else {
                this.createAdError = error.message;
            }
        }
        this.showCreateAdError();
    }

    clearCreateAdAlert() {
        document.getElementById('errorSpan').innerText = '';
        document.getElementById('errorSpan').classList.add('hidden');
        this.createAdError = '';
        document.getElementById('info').classList.remove('hidden');
    }

    showCreateAdError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('errorSpan').classList.remove('hidden');
        setTimeout(this.clearCreateAdAlert, 3000);
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = '../assets/noImage.jpg';
    }


    ngOnDestroy() {
        if (this.singleAdSub) {
            this.singleAdSub.unsubscribe();
        }
    }


}
