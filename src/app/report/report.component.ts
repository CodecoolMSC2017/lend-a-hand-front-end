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

    /*    sendRate() {
     if (!this.ratingValue) {
     this.error = 'A rating value must be selected';
     this.showError();
     return;
     }
     if (!this.message) {
     this.error = 'Message field is required';
     this.showError();
     return;
     }

     const rating = new Rating();
     rating.application = this.application;
     rating.ratedName = this.application.applicantName;
     rating.raterName = this.user.userName;
     rating.rating = this.ratingValue;
     rating.ratingText = this.message;
     this.ratingService.createRating(rating).subscribe(user => {
     sessionStorage.setItem('user', JSON.stringify(user));
     this.gem.updateUser(user);
     this.gem.updateRatingType('myRatings');
     this.router.navigate(['ratings']);
     }, error => {
     this.handleError(error);
     });
     }*/

    sendReport() {
        if (!this.message) {
            this.error = 'Message field is required';
            // this.showError();
            return;
        }

        const report = new Report();
        report.reporterId = this.user.id;
        report.reporterUsername = this.user.userName;
        report.reportedUserId = this.reportedUser.id;
        report.reportedUsername = this.reportedUser.userName;
        report.reportedAdId = this.reportedAd.id;
        report.reportedAdTitle = this.reportedAd.title;
        report.reportText = this.message;

        this.reportService.createReport(report).subscribe(us => {
            // sessionStorage.setItem('user', JSON.stringify(user))
        });

    }

}
