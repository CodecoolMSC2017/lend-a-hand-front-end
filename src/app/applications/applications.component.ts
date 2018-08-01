import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../model/application.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

    applications: Application[];
    applicationSub: Subscription;

    constructor(private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.applicationSub = this.gem.applicationsEmitter.subscribe(applications => {
            if (applications) {
                this.applications = applications;
                sessionStorage.setItem('applications', JSON.stringify(applications));
            } else {
                this.applications = JSON.parse(sessionStorage.getItem('applications'));
            }
        });
    }

    ngOnDestroy(): void {
        if (this.applicationSub) {
            this.applicationSub.unsubscribe();
        }
    }

}
