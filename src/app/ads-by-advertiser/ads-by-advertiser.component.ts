import {Component, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';
import {AdService} from '../service/ad.service';

@Component({
    selector: 'app-ads-by-advertiser',
    templateUrl: './ads-by-advertiser.component.html',
    styleUrls: ['./ads-by-advertiser.component.css']
})
export class AdsByAdvertiserComponent implements OnInit {

    ads: Ad[];
    loaded = false;

    constructor(private gem: GlobalEventManagerService, private router: Router, private adService: AdService) {
    }

    ngOnInit() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(user);
        this.ads = this.formatAds(JSON.parse(sessionStorage.getItem('ads')));
        this.loaded = true;
    }

    archiveAd(ad) {

        this.adService.deleteAdById(ad.id).subscribe(response => {
            if (response) {
                this.adService.getAdsByAdvertiser(ad.advertiserId).subscribe(ads => {
                    this.ads = this.formatAds(ads);
                });
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

    showAd(ad: Ad, event: Event) {
        if ((<HTMLElement>event.target).id === 'archiveButton') {
            return;
        }
        sessionStorage.removeItem('ads');
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = '../assets/No-image-available.jpg';
    }

}
