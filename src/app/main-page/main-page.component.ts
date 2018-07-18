import {Component, OnInit} from '@angular/core';
import {MainPageService} from '../main-page.service';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

    ads = [];
    user = {};
    categories = ['All', 'Babysitting', 'IT', 'Garden', 'Learning', 'Building'];

    constructor(private mainPageService: MainPageService, private authService: AuthorizationService, private router: Router) {
    }

    ngOnInit() {
        if (sessionStorage.getItem('user') != null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
        console.log(this.user);

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

