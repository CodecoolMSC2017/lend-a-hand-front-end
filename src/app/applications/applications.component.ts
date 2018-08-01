import {Component, OnInit} from '@angular/core';
import {Application} from '../model/application.model';
import {GlobalEventManagerService} from '../service/global-event-manager.service';

@Component({
    selector: 'app-applications',
    templateUrl: './applications.component.html',
    styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

    applications: Application[];

    constructor(private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.gem.applicationsEmitter.subscribe(applications => {
            if (applications) {
                this.applications = applications;
                sessionStorage.setItem('applications', JSON.stringify(applications));
            } else {
                this.applications = JSON.parse(sessionStorage.getItem('applications'));
            }
        });
    }

}
