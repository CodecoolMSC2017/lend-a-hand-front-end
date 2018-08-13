import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalEventManagerService} from '../service/global-event-manager.service';
import {User} from '../model/user.model';
import {Subscription} from 'rxjs';
import {Rating} from '../model/rating.model';
import {Application} from '../model/application.model';
import {RatingService} from '../service/rating.service';

@Component({
    selector: 'app-rate',
    templateUrl: './rate.component.html',
    styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit, OnDestroy {

    error: string;
    user: User;
    application: Application;
    appSub: Subscription;
    message: string;
    ratingValue: number;

    constructor(private router: Router, private gem: GlobalEventManagerService, private ratingService: RatingService) {
    }

    ngOnInit() {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.gem.updateUser(this.user);

        this.appSub = this.gem.applicationEmitter.subscribe(application => {
            this.application = application;
        });
    }

    sendRate() {
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

    setRate(rating){
        this.ratingValue=rating;
        for(let i=1;i<=5;i++){
            if(rating!=i){
                document.getElementById(i.toString()).classList.add("notChosen");
            }else{
                document.getElementById(i.toString()).classList.remove("notChosen");
            }
        }
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

    ngOnDestroy(): void {
        if (this.appSub) {
            this.appSub.unsubscribe();
        }
    }

}
