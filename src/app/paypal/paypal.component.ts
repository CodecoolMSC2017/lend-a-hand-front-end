import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';

declare let paypal: any;

@Component({
    selector: 'app-paypal',
    templateUrl: './paypal.component.html',
    styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit, OnDestroy, AfterViewChecked {

    user: User;
    error: string;
    addScript = false;
    paypalLoad = true;
    amount = 8.99;
    paypalConfig = {
        env: 'sandbox',

        style: {
            label: 'checkout',
            size: 'medium',    // small | medium | large | responsive
            shape: 'pill',     // pill | rect
            color: 'black'      // gold | blue | silver | black
        },
        client: {
            sandbox: 'AeKMpDQK-MEPYKhxQuox_EKAt-2ZuS94qyKuqQZNaIsBGujiymlzerK9UDcgvtMwQi1LLyHZ3RWKP6v0',
        },
        commit: true,
        payment: (data, actions) => {
            return actions.payment.create({
                payment: {
                    transactions: [{
                        amount: {
                            total: this.amount,
                            currency: 'USD'
                        }
                    }]
                }
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then((payment) => {
                alert('Successfully bought ' + this.amount + ' Golden Hand');
            });
        }
    };

    constructor(private router: Router, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
    }


    ngAfterViewChecked(): void {
        if (!this.addScript) {
            this.addPaypalScript().then(() => {
                paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
                this.paypalLoad = false;
            });
        }
    }

    addPaypalScript() {
        this.addScript = true;
        return new Promise((resolve, reject) => {
            const scripttagElement = document.createElement('script');
            scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
            scripttagElement.id = 'script';
            scripttagElement.onload = resolve;
            document.body.appendChild(scripttagElement);
        });
    }

    handleError(error) {
        if (error.status === 401) {
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

    clearAlert() {
        this.error = '';
        document.getElementById('error-div').innerText = '';
        document.getElementById('error-div').classList.add('hidden');
    }

    showError() {
        document.getElementById('error-div').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

    ngOnDestroy(): void {
        document.getElementById('script').remove();
    }


}
