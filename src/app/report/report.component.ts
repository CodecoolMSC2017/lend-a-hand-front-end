import {Component, OnInit} from "@angular/core";
import {ReportService} from "../service/report.service";
import {GlobalEventManagerService} from "../service/global-event-manager.service";
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import {Report} from "../model/report.model";
import {Ad} from "../model/ad.model";
import {Subscription} from "rxjs/index";

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

    error: string;
    message: string;
    user: User;
    reportedUser: User;
    reportedAd: Ad;
    reportedUserSub: Subscription;
    reportedAdSub: Subscription;


    constructor(private router: Router, private gem: GlobalEventManagerService, private reportService: ReportService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.reportedUserSub = this.gem.reportedUserEmitter.subscribe(reportedUser => {
            this.reportedUser = reportedUser;
        });

        this.reportedAdSub = this.gem.reportedAdEmitter.subscribe(reportedAd => {
            this.reportedAd = reportedAd;
        });
    }

    sendReport() {
        if (!this.message) {
            this.error = 'Message field is required';
            this.showError();
            return;
        }

        const report = new Report();
        report.reporterId = this.user.id;
        report.reporterUsername = this.user.userName;

        if (this.reportedUser) {
            report.reportedUserId = this.reportedUser.id;
            report.reportedUsername = this.reportedUser.userName;
        }

        if (this.reportedAd) {
            report.reportedAdId = this.reportedAd.id;
            report.reportedAdTitle = this.reportedAd.title;
        }

        report.reportText = this.message;

        this.reportService.createReport(report).subscribe(newReport => {
                this.gem.updateReportedUser(null);
                this.gem.updateReportedAd(null);
                this.gem.updateInfo('Report successfully sent');
                this.router.navigate(['categories']);
            }, serverError => {
                this.handleError(serverError);
            }
        );
    }

    clearAlert() {
        document.getElementById('error').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
    }

    showError() {
        document.getElementById('info').classList.add('hidden');
        document.getElementById('error').classList.remove('hidden');
        setTimeout(this.clearAlert, 3000);
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

}
