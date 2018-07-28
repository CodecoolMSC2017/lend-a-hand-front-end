import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-single-ad',
    templateUrl: './single-ad.component.html',
    styleUrls: ['./single-ad.component.css']
})
export class SingleAdComponent implements OnInit, OnDestroy {
    ad: Ad;
    user: User;
    singleAdSub: Subscription;
    ownAd: boolean;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
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


        if (this.ad.advertiserId === this.user.id) {
            this.ownAd = true;
        } else {
            this.ownAd = false;
        }
    }

    ngOnDestroy() {
        this.singleAdSub.unsubscribe();
    }

}
