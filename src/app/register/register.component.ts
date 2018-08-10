import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../service/authorization.service';
import {RegisterDatasModel} from '../model/register-datas.model';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerDatas = new RegisterDatasModel();
    error: string;


    constructor(private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]],
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            type: ['', [Validators.required]]

        });
    }

    register(): void {
        const email: string = this.registerForm.value.email;
        const username: string = this.registerForm.value.username;
        const password: string = this.registerForm.value.password;
        const type: string = this.registerForm.value.type;
        this.registerDatas.email = email;
        this.registerDatas.userName = username;
        this.registerDatas.password = password;
        this.registerDatas.type = type;
        this.authService.registerUser(this.registerDatas).subscribe(response => {
                this.gem.updateInfo('Registration successfull, you can login now!');
                this.router.navigate(['login']);
            }, error => {
            this.handleError(error);
            }
        );
    }

    putPlaceholder(id) {
        if (id === 'usernameInput') {
            if (this.registerForm.get('username').touched && this.registerForm.hasError('required', ['username'])) {
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder = 'This field is required';
                this.error = 'Username field is required';
                this.showError();
            } else if (this.registerForm.get('username').touched && this.registerForm.hasError('minlength', ['username'])) {
                this.error = 'Username minimum length is 3';
                this.showError();
            } else if (this.registerForm.get('username').touched && this.registerForm.hasError('maxlength', ['username'])) {
                this.error = 'Username maximum length is 32';
                this.showError();
            }
        } else if (id === 'passwordInput') {
            if (this.registerForm.get('password').touched && this.registerForm.hasError('required', ['password'])) {
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder = 'This field is required';
                this.error = 'Password field is required';
                this.showError();
            }
            if (this.registerForm.get('password').touched && this.registerForm.hasError('pattern', ['password'])) {
                this.error = 'Password must contain at least 1 uppercase, 1 lowercase letter and a number';
                this.showError();
            }
        } else if (id === 'emailInput') {
            if (this.registerForm.get('email').touched && this.registerForm.hasError('required', ['email'])) {
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder = 'This field is required';
                this.error = 'Email field is required';
                this.showError();
            } else if (this.registerForm.get('email').dirty && this.registerForm.hasError('pattern', ['email'])) {
                this.error = 'Invalid email address';
                this.showError();
            }
        } else if (id === 'typeInput') {
            if (this.registerForm.get('type').touched && this.registerForm.hasError('required', ['type'])) {
                this.error = 'Type field is required';
                this.showError();
            }
        }

    }


    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 5000);
    }

    handleError(error) {
        if (error.status === 401) {
            sessionStorage.clear();
            this.gem.updateUser(null);
            this.router.navigate(['login']);
        } else {
            if (error.error !== null) {
                this.error = error.error.message;
            } else {
                this.error = error.message;
            }
        }
        this.showError();
    }

}
