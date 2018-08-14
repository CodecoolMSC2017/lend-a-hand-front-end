import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {NotificationService} from '../service/notification.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    user: User;
    notifications: Notification[];
    error: string;

    constructor(private gem: GlobalEventManagerService, private notificationService: NotificationService, private router: Router) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.notificationService.getAllNotificationsByUser(this.user.id).subscribe(notifications => {
            this.notifications = notifications;
        }, error => {
            this.handleError(error);
        });
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
