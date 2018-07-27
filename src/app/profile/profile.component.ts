import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
    currentUsersProfile: User;
    user: User;
    profileSub: Subscription;
    ownProfile: boolean;
    error: string;

    constructor(private gem: GlobalEventManagerService, private userService: UserService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.profileEmitter.subscribe(user => {
            this.currentUsersProfile = user;
        });
        if (this.currentUsersProfile.id === this.user.id) {
            this.ownProfile = true;
        } else {
            this.ownProfile = false;
        }
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
    }


    showFullNameInput(): void {
        const fullNameElements = document.getElementsByClassName('fullname');
        for (const e of <any>fullNameElements) {
            e.classList.add('hidden');
        }

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.setAttribute('id', 'full-name-input');
        if (this.user.fullName == null) {
            inputElement.placeholder = 'Full Name';
        } else {
            inputElement.placeholder = this.user.fullName;
        }
        const contentDiv = document.getElementById('profile-div').firstElementChild;
        contentDiv.appendChild(inputElement);
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
        if (this.user.fullName == null) {
            inputElement.placeholder = 'Phone number';
        } else {
            inputElement.placeholder = this.user.phone;
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
        if (this.user.fullName == null) {
            postalCodeInputElement.placeholder = 'Postal code';
        } else {
            postalCodeInputElement.placeholder = this.user.postalCode;
        }

        const cityInputElement = document.createElement('input');
        cityInputElement.type = 'text';
        cityInputElement.setAttribute('id', 'city-input');
        if (this.user.fullName == null) {
            cityInputElement.placeholder = 'City';
        } else {
            cityInputElement.placeholder = this.user.city;
        }

        const addressInputElement = document.createElement('input');
        addressInputElement.type = 'text';
        addressInputElement.setAttribute('id', 'address-input');
        if (this.user.fullName == null) {
            addressInputElement.placeholder = 'Address';
        } else {
            addressInputElement.placeholder = this.user.address;
        }

        const br = document.createElement('br');
        br.setAttribute('class', 'breakEl');

        const breakEl = document.createElement('br');
        br.setAttribute('class', 'breakEl');


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

        if (fullName === '' && this.user.fullName != null) {
            fullName = this.user.fullName;
        }

        if (phone === '' && this.user.phone != null) {
            phone = this.user.phone;
        }
        if (postalCode === '' && this.user.postalCode != null) {
            postalCode = this.user.postalCode;
        }
        if (city === '' && this.user.city != null) {
            city = this.user.city;
        }
        if (address === '' && this.user.address != null) {
            address = this.user.address;
        }

        console.log(fullName);
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

        this.user.fullName = fullName;
        this.user.phone = phone;
        this.user.postalCode = postalCode;
        this.user.city = city;
        this.user.address = address;
        this.userService.updateUser(this.user).subscribe(response => {
            sessionStorage.setItem('user', JSON.stringify(response));
            this.gem.updateUser(response);
            this.changeBackProfile();
        }, error => {
            console.log(error);
            this.error = error.error.message;
        });


    }

    ngOnDestroy() {
        this.profileSub.unsubscribe();
    }

}
