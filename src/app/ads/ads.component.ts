import {Component, OnInit} from '@angular/core';
import {AdService} from '../ad.service';
import {Router} from '@angular/router';
import {Ad} from '../ad.model';

@Component({
    selector: 'app-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

    ads: Ad[];

    constructor(private router: Router, private adService: AdService) {}

    ngOnInit() {
        this.ads = this.adService.getAds();
        this.adService.ads.subscribe(ads => this.ads = ads);
    }


}
