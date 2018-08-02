import {Component, OnInit} from '@angular/core';
import {AdService} from '../service/ad.service';
import {Ad} from '../model/ad.model';
import {User} from '../model/user.model';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';

@Component({
    selector: 'app-create-ad',
    templateUrl: './create-ad.component.html',
    styleUrls: ['./create-ad.component.css']
})
export class CreateAdComponent implements OnInit {

    categories = ['Beauty', 'Child care', 'Construction', 'Education', 'Garden', 'Health care', 'Housework', 'IT', 'Office', 'Pets', 'Repair', 'Sports', 'Vehicle'];
    selectedCategory: string;
    selectedType: string;
    isPremium: boolean;
    adTitle: string;
    adDescription: string;
    ad: Ad;
    user: User;
    error: string;

    constructor(private adservice: AdService, private router: Router, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.ad = new Ad();
    }

    sendAd() {
        if (!this.selectedCategory) {
            this.error = 'Category must be selected!';
            this.showError();
            return;
        }
        if (!this.selectedType) {
            this.error = 'Type must be selected!';
            this.showError();
            return;
        }
        if (!this.adTitle) {
            this.error = 'Title field is required!';
            this.showError();
            return;
        }
        if (!this.adDescription) {
            this.error = 'Description field is required!';
            this.showError();
            return;
        }


        this.ad.advertiserName = this.user.userName;
        this.ad.advertiserId = this.user.id;
        this.ad.isPremium = this.isPremium;
        this.ad.category = this.selectedCategory;
        this.ad.description = this.adDescription;
        this.ad.title = this.adTitle;
        this.ad.type = this.selectedType;

        this.adservice.createAd(this.ad).subscribe(ad => {
                this.gem.updateInfo('Your Advertisement successfully created');
            }, error => {
                if (error.error !== null) {
                    this.error = error.error.message;
                } else {
                    this.error = error.message;
                }
                this.showError();
            }
        );
        this.router.navigate(['categories']);

    }


    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

}
