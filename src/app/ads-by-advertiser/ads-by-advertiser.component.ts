import {Component, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-ads-by-advertiser',
    templateUrl: './ads-by-advertiser.component.html',
    styleUrls: ['./ads-by-advertiser.component.css']
})
export class AdsByAdvertiserComponent implements OnInit {

    private ads: Ad[];

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(user);
        this.ads = this.formatAds(JSON.parse(sessionStorage.getItem('ads')));
    }


    formatAds(ads: Ad[]): Ad[] {
        let formattedAds = [];
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

    showAd(ad: Ad) {
        sessionStorage.removeItem('ads');
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

    standBy(id) {
        (<HTMLImageElement>document.getElementById(id)).src = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
    }

}
