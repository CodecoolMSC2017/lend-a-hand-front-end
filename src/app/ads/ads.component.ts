import {Component, OnInit} from '@angular/core';
import {AdService} from '../ad.service';
import {Router} from '@angular/router';
import {Ad} from '../ad.model';
import {GlobalEventManagerService} from '../global-event-manager.service';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

    ads: Ad[];

    constructor(private router: Router, private adService: AdService, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.adService.getAds().subscribe(ads => {
            this.ads = ads;
        });
        this.gem.categoryFilterEmitter.subscribe(category => {
            if (category === 'All') {
                this.adService.getAds().subscribe(ads => {
                    this.ads = ads;
                });
            } else if (category) {
                this.adService.getAdsByCategory(category).subscribe(ads => {
                    this.ads = ads;
                });
            }
        });
        this.gem.keywordFilterEmitter.subscribe(keyword => {
            if (keyword) {
                this.adService.getAdsByKeyword(keyword).subscribe(ads => {
                    this.ads = ads;
                });
            } else {
                this.adService.getAds().subscribe(ads => {
                    this.ads = ads;
                });
            }
        });


    }


}
