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
        this.ads = JSON.parse(sessionStorage.getItem('ads'));
    }

    showAd(ad: Ad) {
        sessionStorage.removeItem('ads');
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

}
