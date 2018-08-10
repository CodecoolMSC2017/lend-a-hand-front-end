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
            this.showError();
            return;
        }
        const verificationModel: VerificationModel = new VerificationModel(userName, code);

        this.authService.verificateUser(verificationModel).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.gem.updateUser(response);
                this.zone.run(() => this.router.navigate(['/categories']));
            }, error => {
            this.handleError(error);
            }
        );
    }

    resend(): void {
        this.authService.resendEmail(this.user).subscribe(response => {
            this.showInfo('Verification email sent successfully');
        }, error => {
            this.handleError(error);
        });
    }


    putPlaceholder(id) {
        if (this.verificationForm.hasError('required', ['code'])) {
            const el = <HTMLInputElement>document.getElementById(id);
            el.placeholder = 'This field is required';
            this.error = 'Verification code is required!';
            this.showError();
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

    showInfo(info: string) {
        document.getElementById('info').innerText = info;
        setTimeout(this.hideInfo, 5000);
    }

    hideInfo() {
        document.getElementById('info').innerText = 'Verificate you account via email';
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
