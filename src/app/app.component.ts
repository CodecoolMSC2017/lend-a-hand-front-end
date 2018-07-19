import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalEventManagerService} from './global-event-manager.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    title = 'Lend a hand';
    user = {};
    searchForm: FormGroup;
    keyword: string;

    constructor(private gem: GlobalEventManagerService, private router: Router, private authService: AuthorizationService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if (sessionStorage.getItem(
            'user') != null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
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

    search() {
        this.gem.updateKeywordFilter(this.keyword);
    }
}
