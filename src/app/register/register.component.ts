///<reference path="../../../node_modules/@angular/forms/src/validators.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../register.service';
import {User} from '../user.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    user = new User();

    constructor(private formBuilder: FormBuilder, private registerSevice: RegisterService) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
            password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})$')]],
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            type: ['', [Validators.required]]

        });
    }

    register(): void {
        const email: String = this.registerForm.value.email;
        const username: String = this.registerForm.value.username;
        const password: String = this.registerForm.value.password;
        const type: String = this.registerForm.value.type;
        this.user.email = email;
        this.user.userName = username;
        this.user.password = password;
        this.user.type = type;


        this.registerSevice.registerUser(this.user);

    }

}
