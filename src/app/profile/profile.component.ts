import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';
import {AdService} from '../service/ad.service';
import {Router} from '@angular/router';
import {ApplicationService} from '../application.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    currentUsersProfile: User;
    user: User;
    applicationSub: Subscription;
    adSub: Subscription;
    ownProfile: boolean;
    error: string;

    constructor(private gem: GlobalEventManagerService, private userService: UserService, private adService: AdService, private applicationService: ApplicationService, private router: Router) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);


        this.gem.profileEmitter.subscribe(user => {
            if (user) {
                this.currentUsersProfile = user;
                if (this.currentUsersProfile.id === this.user.id) {
                    this.ownProfile = true;
                } else {
                    this.ownProfile = false;
                }
            } else {
                this.currentUsersProfile = this.user;
                this.ownProfile = true;
            }


        });

    }

    toRatedUsers() {
        this.gem.updateRatingType('myRatings');
        this.router.navigate(['ratings']);
    }

    toMyRatings() {
        this.gem.updateRatingType('rated');
        this.router.navigate(['ratings']);
    }

    toApplications() {
        this.applicationSub = this.applicationService.getApplicationsByApplicantId(this.currentUsersProfile.id).subscribe(applications => {
            this.gem.updateApplications(applications);
        }, error => {
            this.error = error;
            console.log(this.error);
        });
        this.router.navigate(['applications']);
    }


    profileChanges(): void {
        this.showFullNameInput();
        this.showPhoneInput();
        this.showLocationInput();
        this.disableProfileChangeButton();
        this.showChangeButton();
    }

    changeBackProfile(): void {
        this.showFullNameLabel();
        this.showPhoneLabel();
        this.showLocationLabel();
        this.enableProfileChangeButton();
        this.hideChangeButton();
        this.error = '';
    }


    showFullNameInput(): void {
        const fullNameElements = document.getElementsByClassName('fullname');
        for (const e of <any>fullNameElements) {
            e.classList.add('hidden');
        }

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.setAttribute('id', 'full-name-input');
        inputElement.setAttribute('class', 'input-min');
        if (this.currentUsersProfile.fullName == null) {
            inputElement.placeholder = 'Full Name';
        } else {
            inputElement.placeholder = this.currentUsersProfile.fullName;
        }
        const fullnameTd = document.getElementById('fullname-td');
        fullnameTd.appendChild(inputElement);
    }

    showFullNameLabel(): void {
        document.getElementById('full-name-input').remove();
        const fullNameElements = document.getElementsByClassName('fullname');
        for (const e of <any>fullNameElements) {
            e.classList.remove('hidden');
        }
    }

    showPhoneInput(): void {
        const phoneElements = document.getElementsByClassName('phone');
        for (const e of <any>phoneElements) {
            e.classList.add('hidden');
        }
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.setAttribute('id', 'phone-input');
        inputElement.setAttribute('class', 'input-min');
        if (this.currentUsersProfile.fullName == null) {
            inputElement.placeholder = 'Phone number';
        } else {
            inputElement.placeholder = this.currentUsersProfile.phone;
        }

        const phoneTd = document.getElementById('phone-td');
        phoneTd.appendChild(inputElement);
    }

    showPhoneLabel(): void {
        document.getElementById('phone-input').remove();
        const phoneElements = document.getElementsByClassName('phone');
        for (const e of <any>phoneElements) {
            e.classList.remove('hidden');
        }
    }

    showLocationInput(): void {
        const adressElements: HTMLCollectionOf<Element> = document.getElementsByClassName('address');
        for (const e of <any>adressElements) {
            e.classList.add('hidden');
        }
        const postalCodeInputElement = document.createElement('input');
        postalCodeInputElement.type = 'text';
        postalCodeInputElement.setAttribute('id', 'postal-code-input');
        postalCodeInputElement.setAttribute('class', 'input-min');
        if (this.currentUsersProfile.fullName == null) {
            postalCodeInputElement.placeholder = 'Postal code';
        } else {
            postalCodeInputElement.placeholder = this.currentUsersProfile.postalCode;
        }

        const cityInputElement = document.createElement('input');
        cityInputElement.type = 'text';
        cityInputElement.setAttribute('id', 'city-input');
        cityInputElement.setAttribute('class', 'input-min');
        if (this.currentUsersProfile.fullName == null) {
            cityInputElement.placeholder = 'City';
        } else {
            cityInputElement.placeholder = this.currentUsersProfile.city;
        }

        const addressInputElement = document.createElement('input');
        addressInputElement.type = 'text';
        addressInputElement.setAttribute('id', 'address-input');
        addressInputElement.setAttribute('class', 'input-min');
        if (this.currentUsersProfile.fullName == null) {
            addressInputElement.placeholder = 'Address';
        } else {
            addressInputElement.placeholder = this.currentUsersProfile.address;
        }

        const br = document.createElement('br');
        br.setAttribute('class', 'breakEl');

        const breakEl = document.createElement('br');
        breakEl.setAttribute('class', 'breakEl');


        const locationTd = document.getElementById('address-td');
        locationTd.appendChild(postalCodeInputElement);
        locationTd.appendChild(br);
        locationTd.appendChild(cityInputElement);
        locationTd.appendChild(breakEl);
        locationTd.appendChild(addressInputElement);
    }

    showLocationLabel(): void {
        document.getElementById('postal-code-input').remove();
        document.getElementById('city-input').remove();
        document.getElementById('address-input').remove();

        const breakElements: HTMLCollectionOf<Element> = document.getElementsByClassName('breakEl');
        for (const e of <any>breakElements) {
            e.remove();
        }
        const adressElements: HTMLCollectionOf<Element> = document.getElementsByClassName('address');
        for (const e of <any>adressElements) {
            e.classList.remove('hidden');
        }

    }


    disableProfileChangeButton(): void {
        document.getElementById('profile-change-button').classList.add('hidden');
    }

    enableProfileChangeButton(): void {
        document.getElementById('profile-change-button').classList.remove('hidden');
    }

    showChangeButton(): void {

        const updateButton = document.getElementById('update-button');
        updateButton.classList.remove('hidden');
    }

    hideChangeButton(): void {

        const updateButton = document.getElementById('update-button');
        updateButton.classList.add('hidden');
    }

    update(): void {
        let fullName = (<HTMLInputElement>document.getElementById('full-name-input')).value;
        let phone = (<HTMLInputElement>document.getElementById('phone-input')).value;
        let postalCode = (<HTMLInputElement>document.getElementById('postal-code-input')).value;
        let city = (<HTMLInputElement>document.getElementById('city-input')).value;
        let address = (<HTMLInputElement>document.getElementById('address-input')).value;

        if (fullName === '' && this.currentUsersProfile.fullName != null) {
            fullName = this.currentUsersProfile.fullName;
        }

        if (phone === '' && this.currentUsersProfile.phone != null) {
            phone = this.currentUsersProfile.phone;
        }
        if (postalCode === '' && this.currentUsersProfile.postalCode != null) {
            postalCode = this.currentUsersProfile.postalCode;
        }
        if (city === '' && this.currentUsersProfile.city != null) {
            city = this.currentUsersProfile.city;
        }
        if (address === '' && this.currentUsersProfile.address != null) {
            address = this.currentUsersProfile.address;
        }

        if (fullName === '') {
            this.error = 'Full name field is required!';
            return;
        }
        if (phone === '') {
            this.error = 'Phone field is required!';
            return;
        }
        if (postalCode === '') {
            this.error = 'Postal code field is required!';
            return;
        }
        if (city === '') {
            this.error = 'City field is required!';
            return;
        }
        if (address === '') {
            this.error = 'Address field is required!';
            return;
        }

        this.currentUsersProfile.fullName = fullName;
        this.currentUsersProfile.phone = phone;
        this.currentUsersProfile.postalCode = postalCode;
        this.currentUsersProfile.city = city;
        this.currentUsersProfile.address = address;
        this.userService.updateUser(this.currentUsersProfile).subscribe(response => {
            sessionStorage.setItem('user', JSON.stringify(response));
            this.gem.updateUser(response);
            this.changeBackProfile();
        }, error => {
            console.log(error);
            this.error = error.error.message;
        });


    }


    toManageAdvertisements() {
        this.adSub = this.adService.getAdsByAdvertiser(this.currentUsersProfile.id).subscribe(ads => {
                sessionStorage.setItem('ads', JSON.stringify(ads));
                this.router.navigate(['adsByAdvertiser']);
            }, error => {
            if (error.error !== null) {
                this.error = error.error;
            } else {
                this.error = error;
            }
            }
        );
    }

    ngOnDestroy() {
   
        
    }

}
