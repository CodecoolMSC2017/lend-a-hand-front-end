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
        const verificationModel: VerificationModel = new VerificationModel(userName, code);
        this.authService.verificateUser(verificationModel).subscribe(response => {
                sessionStorage.setItem('user', JSON.stringify(response));
                this.gem.updateUser(response);
                this.zone.run(() => this.router.navigate(['/categories']));
            }, error => {
            alert(error.error.message);
            }
        );
    }


    putPlaceholder(id) {
        if (this.verificationForm.hasError('required', ['code'])) {
            const el = <HTMLInputElement>document.getElementById(id);
            el.placeholder = 'This field is required';
        }
    }
}
