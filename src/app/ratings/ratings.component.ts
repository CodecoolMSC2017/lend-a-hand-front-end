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
export class RatingsComponent implements OnInit {

  employeeRatings: Rating[];
  employerRatings: Rating[];
  ratingtype: string;


  constructor(private router: Router,
    private ratingService: RatingService,
    private gem: GlobalEventManagerService) {
}

  ngOnInit() {
    this.gem.ratingTypeEmitter.subscribe(ratingType=> {
      this.ratingtype = ratingType;
      if (ratingType == 'rated') {
        this.ratingService.getRatingsAboutMe((JSON.parse(sessionStorage.getItem('user')) as User).id).subscribe(ratingDto=> {
          this.employeeRatings = ratingDto.employeeRatings;
          this.employerRatings = ratingDto.employerRatings;
        })
      }else if (ratingType == 'myRatings'){
        this.ratingService.getRatings((JSON.parse(sessionStorage.getItem('user')) as User).id).subscribe(ratingDto=> {
          this.employeeRatings = ratingDto.employeeRatings;
          this.employerRatings = ratingDto.employerRatings;
        })
    }
    });
  }

}
