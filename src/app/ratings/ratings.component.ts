import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class RatingsComponent implements OnInit, OnDestroy {

    employeeRatings: Rating[];
    employerRatings: Rating[];
    ratingtype: string;
    user: User;
    loaded = false;
    ratingSub: Subscription;


    constructor(private router: Router,
                private ratingService: RatingService,
                private gem: GlobalEventManagerService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);
        this.gem.ratingTypeEmitter.subscribe(ratingType => {
            this.ratingtype = ratingType;
            if (ratingType === 'rated') {
                this.ratingSub = this.ratingService.getRatingsAboutMe(this.user.id).subscribe(ratingDto => {

                    this.employeeRatings = ratingDto.employeeRatings as Rating[];
                    this.employerRatings = ratingDto.employerRatings as Rating[];
                    this.loaded = true;
                });
            } else if (ratingType === 'myRatings') {
                this.ratingSub = this.ratingService.getRatings(this.user.id).subscribe(ratingDto => {

                    this.employeeRatings = ratingDto.employeeRatings;
                    this.employerRatings = ratingDto.employerRatings;
                    this.loaded = true;
                });
            }
        });
    }

    ngOnDestroy() {
        if (this.ratingSub) {
            this.ratingSub.unsubscribe();
        }

    }

}
