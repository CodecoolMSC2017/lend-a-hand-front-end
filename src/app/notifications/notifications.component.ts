import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {NotificationService} from '../service/notification.service';
import {Router} from '@angular/router';
import {Notification} from '../model/notification';
import {Ad} from '../model/ad.model';
import {ApplicationService} from '../service/application.service';
import {Application} from '../model/application.model';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    user: User;
    notifications: Notification[];
    error: string;
    loaded = false;

    constructor(private gem: GlobalEventManagerService, private notificationService: NotificationService,
                private applicationService: ApplicationService, private router: Router) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.notificationService.getAllNotificationsByUser(this.user.id).subscribe(notifications => {
            this.notifications = this.formatNotifications(notifications);
            this.loaded = true;
        }, error => {
            this.handleError(error);
            this.loaded = true;
        });
    }

    read(id: number) {
        const noteTd = document.getElementById(id.toString());
        noteTd.children.item(1).classList.remove('hidden');
        noteTd.children.item(2).classList.remove('hidden');
        const close = (event) => this.close(id);
        const read = (event) => this.read(id);
        noteTd.removeEventListener('click', read);
        noteTd.addEventListener('click', close);
        this.notificationService.readNotification(id).subscribe(notification => {
            noteTd.parentElement.classList.remove('false');
        }, error => {
            this.handleError(error);
        });
    }

    close(id: number) {
        const noteTd = document.getElementById(id.toString());
        noteTd.children.item(1).classList.add('hidden');
        noteTd.children.item(2).classList.add('hidden');
        const close = (event) => this.close(id);
        const read = (event) => this.read(id);
        noteTd.removeEventListener('click', close);
        noteTd.addEventListener('click', read);
    }

    toAd(ad: Ad) {
        this.gem.updateSingleAd(ad);
        this.router.navigate(['ad']);
    }

    toMessages() {
        this.router.navigate(['messages']);
    }

    toMyApplications() {
        this.applicationService.getApplicationsByApplicantId(this.user.id).subscribe(applications => {
            this.gem.updateApplications(applications);
            this.router.navigate(['applications']);
        }, error => {
            this.handleError(error);
        });
    }

    toRate(application: Application) {
        this.gem.updateApplication(application);
        sessionStorage.setItem('application', JSON.stringify(application));
        this.router.navigate(['rate']);
    }

    toMyRaters() {
        this.gem.updateRatingType('rated');
        this.router.navigate(['ratings']);
    }

    toReports() {
        this.router.navigate(['reports']);
    }

    unread() {
        const idArr = this.getCheckedValues();
        for (const id of <any>idArr) {
            this.notificationService.unreadNotification(id).subscribe(notification => {
                const noteTd = document.getElementById(notification.id);
                noteTd.parentElement.classList.add('false');
            }, error => {
                this.handleError(error);
            });
        }
    }

    delete() {
        const idArr = this.getCheckedValues();
        for (const id of <any>idArr) {
            this.notificationService.deleteNotification(id).subscribe(notification => {
                const noteTd = document.getElementById(notification.id);
                noteTd.parentElement.remove();
                const notificationTable = document.getElementById('notification-table');
                if (notificationTable.getElementsByTagName('tr').length === 0) {
                    this.notifications = [];
                }
            }, error => {
                this.handleError(error);
            });
        }

    }

    getCheckedValues() {
        const checkboxes = document.getElementsByClassName('checkbox');
        const idArr = [];
        for (const e of <any>checkboxes) {
            if ((< HTMLInputElement >e).checked) {
                idArr.push((< HTMLInputElement >e).value);
            }
        }
        return idArr;
    }

    formatNotificationShortTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        const splittedTimestamp = (timestamp + '').split(',');
        formattedTimestamp = formattedTimestamp + splittedTimestamp[0] + '.';
        if (splittedTimestamp[1].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[1] + '.';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[1] + '.';
        }
        if (splittedTimestamp[2].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[2] + '.';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[2] + '.';
        }
        return formattedTimestamp;
    }

    formatNotificationTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        const splittedTimestamp = (timestamp + '').split(',');
        formattedTimestamp = formattedTimestamp + this.formatNotificationShortTimestamp(timestamp) + ' ';
        if (splittedTimestamp[3].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[3] + ':';
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[3] + ':';
        }
        if (splittedTimestamp[4].length < 2) {
            formattedTimestamp = formattedTimestamp + '0' + splittedTimestamp[4];
        } else {
            formattedTimestamp = formattedTimestamp + splittedTimestamp[4];
        }
        return formattedTimestamp;
    }

    formatNotifications(notifications: Notification[]): Notification[] {
        const formattedNotifications = [];
        for (let i = 0; i < notifications.length; i++) {
            const notification = notifications[i];
            notification.formattedTimestamp = this.formatNotificationTimestamp(notification.timestamp);
            notification.timestamp = this.formatNotificationTimestamp(notification.timestamp);
            formattedNotifications.push(notification);
        }
        return formattedNotifications;
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
