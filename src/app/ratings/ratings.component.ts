import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {Subscription} from 'rxjs';
import {User} from '../model/user.model';
import {Rating} from '../model/rating.model';
import {RatingService} from '../service/rating.service';


@Component({
    selector: 'app-ratings',
    templateUrl: './ratings.component.html',
    styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

    employeeRatings: Rating[];
    employerRatings: Rating[];
    ratingtype: string;
    ratingSub: Subscription;


    constructor(private router: Router,
                private ratingService: RatingService,
                private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.gem.ratingTypeEmitter.subscribe(ratingType => {
            this.ratingtype = ratingType;
            if (ratingType == 'rated') {
                this.ratingSub = this.ratingService.getRatingsAboutMe((JSON.parse(sessionStorage.getItem('user')) as User).id).subscribe(ratingDto => {

                    this.employeeRatings = ratingDto.employeeRatings as Rating[];
                    this.employerRatings = ratingDto.employerRatings as Rating[];
                });
            } else if (ratingType == 'myRatings') {
                this.ratingSub = this.ratingService.getRatings((JSON.parse(sessionStorage.getItem('user')) as User).id).subscribe(ratingDto => {

                    this.employeeRatings = ratingDto.employeeRatings;
                    this.employerRatings = ratingDto.employerRatings;
                });
            }
            console.log(this.employeeRatings);
            console.log(this.employerRatings);
        });
    }

    ngOnDestroy() {
        if (this.ratingSub) {
            this.ratingSub.unsubscribe();
        }

    }

}
