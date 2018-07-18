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
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]]
        });

    }

    login(): void {
        const email: String = this.loginForm.value.email;
        const password: String = this.loginForm.value.password;
        this.user.email = email;
        this.user.password = password;
        this.authService.loginUser(this.user).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
            this.authService.authorizeUser(JSON.parse(sessionStorage.getItem('user'))).subscribe(user => {
                this.router.navigate(['main']);
            });
            }, error => {
                alert(error.error.message);
            }
        );
    }
}

