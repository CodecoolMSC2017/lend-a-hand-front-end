import {Component, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';

@Component({
    selector: 'app-ads-by-advertiser',
    templateUrl: './ads-by-advertiser.component.html',
    styleUrls: ['./ads-by-advertiser.component.css']
})
export class AdsByAdvertiserComponent implements OnInit {

    private ads: Ad[];

    constructor() {
    }

    ngOnInit() {
        this.ads = JSON.parse(sessionStorage.getItem('ads'));
        sessionStorage.removeItem('ads');
    }

}
