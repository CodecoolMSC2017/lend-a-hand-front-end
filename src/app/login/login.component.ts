import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    loginForm: FormGroup;
    user = new User();

    constructor(private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]]
        });

    }

    login(): void {
        const userName: String = this.loginForm.value.userName;
        const password: String = this.loginForm.value.password;
        this.user.userName = userName;
        this.user.password = password;
        this.authService.loginUser(this.user).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.router.navigate(['main']);
            }, error => {
            alert(error.message);
            }
        );
    }
}

