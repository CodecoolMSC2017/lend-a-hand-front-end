import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../service/user.service';
import {ApplicationService} from '../application.service';
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
            console.log(this.ad.id);
            this.applications = applications;
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
        }, error => {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
            this.showError();
        });
        this.router.navigate(['categories']);
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
        (<HTMLImageElement>document.getElementById(id)).src = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    }


}
