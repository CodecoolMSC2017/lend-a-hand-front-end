import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../user.model';
import {Router} from '@angular/router';
import {AuthorizationService} from '../authorization.service';
import {GlobalEventManagerService} from '../global-event-manager.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    loginForm: FormGroup;
    user = new User();

    constructor(private gem:GlobalEventManagerService,private zone: NgZone, private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})$')]]
        });

    }

    login(): void {
        const userName: string = this.loginForm.value.userName;
        const password: string = this.loginForm.value.password;
        this.user.userName = userName;
        this.user.password = password;
        this.authService.loginUser(this.user).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.gem.updateUser(response);
            this.zone.run(() => this.router.navigate(['/categories']));
            }, error => {
            alert(error.message);
            }
        );
    }

    putPlaceholder(id){
        if(id=="usernameInput"){
            if(this.loginForm.hasError('required', ['userName'])){
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder="This field is required";
                
            }
        }else if(id=="passwordInput"){
            if(this.loginForm.get('password').touched && this.loginForm.hasError('required', ['password'])){
                const el = <HTMLInputElement>document.getElementById(id);
                el.placeholder="This field is required";
                
        }
        
    }
}
}

