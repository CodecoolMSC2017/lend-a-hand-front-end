import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../service/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, OnDestroy {

    ads: Ad[];
    user: User;
    filterSub: Subscription;

    constructor(private router: Router,
                private adService: AdService,
                private gem: GlobalEventManagerService) {
    }

    showAd(ad: Ad) {
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.filterSub = this.gem.filterSettingsEmitter.subscribe(filterSettings => {
            if (filterSettings) {
                this.adService.getAdsByFilter(filterSettings.keyword, filterSettings.selectedCategory, filterSettings.selectedType)
                    .subscribe(ads => {
                        this.ads = ads;
                        sessionStorage.setItem('ads', JSON.stringify(ads));
                    }, error => {
                        console.log(error);
                    });
            } else {
                this.ads = JSON.parse(sessionStorage.getItem('ads'));
            }
        });
    }

    ngOnDestroy() {
        if (this.filterSub) {
            this.filterSub.unsubscribe();
        }
    }
}
