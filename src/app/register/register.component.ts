import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../authorization.service';
import {RegisterDatasModel} from '../register-datas.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    registerDatas = new RegisterDatasModel();

    constructor(private formBuilder: FormBuilder, private authService: AuthorizationService) {
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
            alert(response.message);
        }, error => {
            alert(error.error.message);
        });
    }

}
