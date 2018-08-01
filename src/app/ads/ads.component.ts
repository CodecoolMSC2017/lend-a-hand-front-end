import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../service/ad.service';
import {Router} from '@angular/router';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {stringify} from '@angular/compiler/src/util';

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
                        this.ads = this.formatAds(ads);
                        sessionStorage.setItem('ads', JSON.stringify(ads));
                    }, error => {
                        console.log(error);
                    });
            } else {
                this.ads = JSON.parse(sessionStorage.getItem('ads'));
            }
        });
    }

    formatAds(ads: Ad[]): Ad[] {
        let formattedAds =  [];
        for (let i = 0; i < ads.length; i++) {
            let ad = ads[i];
            if (ad.description.length > 85) {
                ad.formattedDescription = ad.description.substring(0, 85) + '...';
            } else {
                ad.formattedDescription = ad.description;
            }
            ad.formattedTimestamp = this.formatAdsTimestamp(ad.timestamp);
            ad.timestamp = this.formatAdTimestamp(ad.timestamp);
            formattedAds.push(ad);
        }
        return formattedAds;
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
        console.log(splittedTimestamp);
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

    ngOnDestroy() {
        if (this.filterSub) {
            this.filterSub.unsubscribe();
        }
    }
}
