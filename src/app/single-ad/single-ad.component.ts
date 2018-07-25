import {Component, OnInit} from '@angular/core';
import {Ad} from '../model/ad.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-single-ad',
    templateUrl: './single-ad.component.html',
    styleUrls: ['./single-ad.component.css']
})
export class SingleAdComponent implements OnInit {
    ad: Ad;

    constructor(private gem: GlobalEventManagerService, private router: Router) {
    }

    ngOnInit() {
        this.gem.singleAdEmitter.subscribe(ad => {
            this.ad = ad;
            console.log(ad.title);
        });

    }

}
