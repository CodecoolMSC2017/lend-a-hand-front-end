import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../service/authorization.service';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {VerificationModel} from '../model/verification.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

    verificationForm: FormGroup;
    user: User;
    error: string;


    constructor(private gem: GlobalEventManagerService, private zone: NgZone, private formBuilder: FormBuilder, private authService: AuthorizationService, private router: Router) {
    }

    ngOnInit() {

        this.verificationForm = this.formBuilder.group({
            code: ['', [Validators.required]],
        });

        if (sessionStorage.getItem('user') != null) {
            this.user = JSON.parse(sessionStorage.getItem('user'));
        }
    }

    verificate(): void {
        const userName = this.user.userName;
        const code = this.verificationForm.value.code;
        if (code === '') {
            this.error = 'Verification code is required!';
            return;
        }
        const verificationModel: VerificationModel = new VerificationModel(userName, code);

        this.authService.verificateUser(verificationModel).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.gem.updateUser(response);
                this.zone.run(() => this.router.navigate(['/categories']));
            }, error => {
            this.error = error.error.message;
            }
        );
    }

    resend(): void {
        this.authService.resendEmail(this.user).subscribe(response => {
            this.error = 'Verification email sent successfully';
        }, error => {
            this.error = error.error.message;
        });
    }


    putPlaceholder(id) {
        if (this.verificationForm.hasError('required', ['code'])) {
            const el = <HTMLInputElement>document.getElementById(id);
            el.placeholder = 'This field is required';
        }
    }
}
