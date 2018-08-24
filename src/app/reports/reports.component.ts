import {Component, OnInit} from "@angular/core";
import {Report} from "../model/report.model";
import {ShowReportsService} from "../service/show-reports.service";
import {User} from "../model/user.model";
import {GlobalEventManagerService} from "../service/global-event-manager.service";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {AdService} from "../service/ad.service";
import {ReportService} from "../service/report.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


    userReports: Report[];
    adReports: Report[];
    user: User;
    error: string;

    constructor(private reportsService: ShowReportsService, private gem: GlobalEventManagerService,
                private router: Router, private userService: UserService, private adService: AdService,
                private reportService: ReportService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.reportsService.getUserReports().subscribe(reports => {
            this.userReports = this.formatReports(reports);
        }, error => {
            this.handleError(error);
        });

        this.reportsService.getAdReports().subscribe(reports => {
            this.adReports = this.formatReports(reports);
        }, error => {
            this.handleError(error);
        });
        this.showUserReports();

    }

    toReportedAd(adId) {
        this.adService.getAdById(adId).subscribe(ad => {
            this.gem.updateSingleAd(ad);
            this.router.navigate(['ad']);
        }, error => {
            this.handleError(error);
        });
    }

    toProfile(userId) {

        this.userService.getUserById(userId).subscribe(user => {
            this.gem.updateProfile(user);
            this.router.navigate(['profile']);
        }, error => {
            this.handleError(error);
        });
    }

    handleReport(reportId) {
        this.reportService.handleReport(reportId).subscribe(reports => {
            if (this.isAdReportList(reports)) {
                this.adReports = reports;
            } else {
                this.userReports = reports;
            }
        }, error => {
            this.handleError(error);
        });
    }

    showUserReports() {
        if (document.getElementById('userReportsDiv').classList.contains('hidden')) {
            document.getElementById('userReportsDiv').classList.remove('hidden');
            document.getElementById('adReportsDiv').classList.add('hidden');
        }
    }

    showAdReports() {
        if (document.getElementById('adReportsDiv').classList.contains('hidden')) {
            document.getElementById('adReportsDiv').classList.remove('hidden');
            document.getElementById('userReportsDiv').classList.add('hidden');
        }

    }

    isAdReportList(reports): boolean {
        if (reports[0].reportedAdTitle == null) {
            return false;
        }
        return true;
    }

    formatReportShortTimestamp(timestamp: string): string {
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

    formatReportTimestamp(timestamp: string): string {
        let formattedTimestamp = '';
        const splittedTimestamp = (timestamp + '').split(',');
        formattedTimestamp = formattedTimestamp + this.formatReportShortTimestamp(timestamp) + ' ';
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

    formatReports(reports: Report[]): Report[] {
        const formattedReports = [];
        for (let i = 0; i < reports.length; i++) {
            const report = reports[i];
            report.formattedTimestamp = this.formatReportTimestamp(report.timestamp);
            formattedReports.push(report);
        }
        return formattedReports;
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
