import {Component, OnInit} from '@angular/core';
import {MainPageService} from '../main-page.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    ads = [];
    user = {};

    constructor(private mainPageService: MainPageService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.mainPageService.getAds().subscribe(response => {
            this.ads = response;
        });
    }

}
