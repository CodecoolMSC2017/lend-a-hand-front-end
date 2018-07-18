import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Lend a hand';
    user = {};

    constructor(private router: Router, private authService: AuthorizationService) {
    }

    ngOnInit() {
        if (sessionStorage.getItem(
            'user') != null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }

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
