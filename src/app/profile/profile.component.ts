import {Component, OnInit} from '@angular/core';
import {GlobalEventManagerService} from '../global-event-manager.service';
import {User} from '../user.model';

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

    constructor(private gem: GlobalEventManagerService) {
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


    showFullNameInput(): void {
        const fullNameElements = document.getElementsByClassName('fullname');
        for (const e of fullNameElements) {
            e.classList.add('hidden');
        }

        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.setAttribute('id', 'full-name-input');
        inputElement.placeholder = 'Full Name';

        const contentDiv = document.getElementById('profile-div').firstElementChild;
        contentDiv.appendChild(inputElement);
    }

    showPhoneInput(): void {
        const fullNameElements = document.getElementsByClassName('phone');
        for (const e of fullNameElements) {
            e.classList.add('hidden');
        }
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.setAttribute('id', 'phone-input');
        inputElement.placeholder = 'Phone number';

        const phoneTd = document.getElementById('phone-td');
        phoneTd.appendChild(inputElement);
    }

    showLocationInput(): void {
        const fullNameElements: HTMLCollectionOf<Element> = document.getElementsByClassName('address');
        for (const e of fullNameElements) {
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
        locationTd.appendChild(document.createElement('br'));
        locationTd.appendChild(cityInputElement);
        locationTd.appendChild(document.createElement('br'));
        locationTd.appendChild(addressInputElement);
    }

    disableProfileChangeButton(): void {
        document.getElementById('profile-change-button').classList.add('hidden');
    }

    showChangeButton(): void {

        const updateButton = document.createElement('button');
        updateButton.setAttribute('id', 'update-button');
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', this.update);

        const contentDiv = document.getElementById('profile-div').firstElementChild;
        contentDiv.appendChild(updateButton);
    }

    update(): void {
        console.log('ANYÁD!');
    }
}
