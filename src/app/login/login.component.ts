import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {AuthorizationService} from '../service/authorization.service';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {


    loginForm: FormGroup;
    user = new User();
    error: string;
    infoSub: Subscription;

    constructor(private gem: GlobalEventManagerService,
                private zone: NgZone,
                private formBuilder: FormBuilder,
                private authService: AuthorizationService,
                private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
        this.showInfo();

    }

    login(): void {
        const userName: string = this.loginForm.value.userName;
        const password: string = this.loginForm.value.password;
        this.user.userName = userName;
        this.user.password = password;
        this.authService.loginUser(this.user).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.gem.updateUser(response);
            this.zone.run(() => this.router.navigate(['/categoriesAfterLogin']));
            }, error => {
            this.handleError(error);
            }
        );
    }

    putPlaceholder(id) {
        if (id === 'usernameInput') {
            if (this.loginForm.hasError('required', ['userName'])) {
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder = 'This field is required';
                this.error = 'Username field is required';
                this.showError();


            }
        } else if (id === 'passwordInput') {
            if (this.loginForm.get('password').touched && this.loginForm.hasError('required', ['password'])) {
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder = 'This field is required';
                this.error = 'Password field is required';
                this.showError();
            }
        }
    }

    handleError(error) {
        if (error.status === 401) {
            this.error = 'Wrong User name or password.';
        } else {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
        }
        this.showError();
    }

    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

    showInfo() {
        this.gem.infoEmitter.subscribe(info => {
            if (info) {
                document.getElementById('info').innerText = info;
                setTimeout(this.hideInfo, 3000);

            }
        });
    }

    hideInfo() {
        document.getElementById('info').innerText = 'Log in to your existing account';
        this.gem.updateInfo(null);
    }

    ngOnDestroy(): void {
        this.gem.updateInfo(null);
        if (this.infoSub) {
            this.infoSub.unsubscribe();
        }
    }
}

