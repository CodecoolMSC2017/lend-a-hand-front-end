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
}
