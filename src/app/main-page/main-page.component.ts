import {Component, OnInit} from '@angular/core';
import {MainPageService} from '../main-page.service';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {AdService} from '../ad.service';
import {GlobalEventManagerService} from '../global-event-manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    ads = [];
    user = {};
    searchForm: FormGroup;
    keyword: string;

    constructor(private formBuilder: FormBuilder, private adService: AdService, private mainPageService: MainPageService, private authService: AuthorizationService, private router: Router, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('user') != null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        this.adService.getAds().subscribe(ads => {
            this.ads = ads;
        });

        this.searchForm = this.formBuilder.group({
            search: ['', [Validators.required]]
        });

    }


    toLogin() {
        this.router.navigate(['login']);
    }

    toRegister() {
        this.router.navigate(['register']);
    }

    logout() {
        const clearAuth = () => {
            sessionStorage.clear();
            this.router.navigate(['login']);
        };
        this.authService.deleteAuth().subscribe(clearAuth, clearAuth);
    }


}

