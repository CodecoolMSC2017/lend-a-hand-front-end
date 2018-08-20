import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users: User[];
    user: User;
    error: string;


    constructor(private userService: UserService, private gem: GlobalEventManagerService, private router: Router) {
    }


    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.userService.getAllUser().subscribe(users => {

            this.users = users;
        }, error => {
            this.handleError(error);
        });
    }

    toUserProfile(user) {
        this.gem.updateProfile(user);
        this.router.navigate(['profile']);

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

    showError() {
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
    }

    clearAlert() {
        this.error = '';
        document.getElementById('error').innerText = '';
        document.getElementById('error').classList.add('hidden');
    }

}
