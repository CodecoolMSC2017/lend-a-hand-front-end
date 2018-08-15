import {Component, OnInit} from "@angular/core";
import {Report} from "../model/report.model";
import {ShowReportsService} from "../service/show-reports.service";
import {User} from "../model/user.model";
import {GlobalEventManagerService} from "../service/global-event-manager.service";

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

    userReports: Report[];
    adReports: Report[];
    user: User;

    constructor(private reportsService: ShowReportsService, private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.reportsService.getUserReports().subscribe(reports => {

            this.userReports = reports;
        });

        this.reportsService.getAdReports().subscribe(reports => {

            this.adReports = reports;
        });

    }

    showUserReports() {
        if (document.getElementById("userReportsDiv").classList.contains("hidden")) {
            document.getElementById("userReportsDiv").classList.remove("hidden");
            document.getElementById("adReportsDiv").classList.add("hidden");
        }

    }

    showAdReports() {
        if (document.getElementById("adReportsDiv").classList.contains("hidden")) {
            document.getElementById("adReportsDiv").classList.remove("hidden");
            document.getElementById("userReportsDiv").classList.add("hidden");
        }

    }

}
