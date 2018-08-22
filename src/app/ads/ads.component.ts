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
    error: string;
    loaded = false;

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
                        this.handleError(error);
                    });
                this.loaded = true;
            } else {
                this.ads = JSON.parse(sessionStorage.getItem('ads'));
                this.loaded = true;
            }
        });


    }

    formatAds(ads: Ad[]): Ad[] {
        const formattedAds = [];
        for (let i = 0; i < ads.length; i++) {
            let ad = ads[i];
            if (ad.description.length > 85) {
                ad.formattedDescription = ad.description.substring(0, 85) + '...';
            } else {
                ad.formattedDescription = ad.description;
            }
            ad.formattedTimestamp = this.formatAdsTimestamp(ad.timestamp);
            formattedAds.push(ad);
        }
        return formattedAds;
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

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = '../assets/noImage.jpg';
    }

    handleError(error) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.gem.updateUser(null);
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

    showError() {
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

    clearAlert() {
        this.error = '';
        document.getElementById('error').innerText = '';
        document.getElementById('error').classList.add('hidden');
    }


    ngOnDestroy() {
        if (this.filterSub) {
            this.filterSub.unsubscribe();
        }
    }
}
