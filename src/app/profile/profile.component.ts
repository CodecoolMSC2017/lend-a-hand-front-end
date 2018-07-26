import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: User;
    currentUsersProfile: User;
    user: User;
    ownProfile: boolean;
    userName: string;
    error: string;

    constructor(private gem: GlobalEventManagerService, private userService: UserService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        /*this.gem.profileEmitter.subscribe(user => {
            this.currentUsersProfile = user;
        });
        this.gem.userEmitter.subscribe(user => {
            this.currentUser = user;
        });
        if (this.currentUser.id === this.currentUsersProfile.id) {
            this.ownProfile = true;
        } else {
            this.ownProfile = false;
        }
        */
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
        inputElement.placeholder = 'Full Name';

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
        inputElement.placeholder = 'Phone number';

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
        postalCodeInputElement.placeholder = 'Postal code';

        const cityInputElement = document.createElement('input');
        cityInputElement.type = 'text';
        cityInputElement.setAttribute('id', 'city-input');
        cityInputElement.placeholder = 'City';

        const addressInputElement = document.createElement('input');
        addressInputElement.type = 'text';
        addressInputElement.setAttribute('id', 'address-input');
        addressInputElement.placeholder = 'Address';

        const locationTd = document.getElementById('address-td');
        locationTd.appendChild(postalCodeInputElement);
        locationTd.appendChild(cityInputElement);
        locationTd.appendChild(addressInputElement);
    }

    showLocationLabel(): void {
        document.getElementById('postal-code-input').remove();
        document.getElementById('city-input').remove();
        document.getElementById('address-input').remove();

        const adressElements: HTMLCollectionOf<Element> = document.getElementsByClassName('address');
        for (const e of <any>adressElements) {
            e.classList.remove('hidden');
        }
    }


    disableProfileChangeButton(): void {
        document.getElementById('profile-change-button').classList.add('hidden');
    }

    enableProfileChangeButton(): void {
        document.getElementById('profile-change-button').classList.add('remove');
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
        const fullName = (<HTMLInputElement>document.getElementById('full-name-input')).value;
        const phone = (<HTMLInputElement>document.getElementById('phone-input')).value;
        const postalCode = (<HTMLInputElement>document.getElementById('postal-code-input')).value;
        const city = (<HTMLInputElement>document.getElementById('city-input')).value;
        const address = (<HTMLInputElement>document.getElementById('address-input')).value;

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
            this.error = error.error.message;
        });


    }
}
