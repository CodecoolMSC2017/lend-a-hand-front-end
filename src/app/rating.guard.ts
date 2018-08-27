import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './model/user.model';
import {RatingService} from './service/rating.service';
import {Application} from './model/application.model';
import {GlobalEventManagerService} from './service/global-event-manager.service';

@Injectable({
    providedIn: 'root'
})
export class RatingGuard implements CanActivate {

    constructor(private router: Router, private ratingService: RatingService, private gem: GlobalEventManagerService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!sessionStorage.getItem('user')) {
            this.router.navigate(['login']);
            return false;
        }

        if (!sessionStorage.getItem('application')) {
            this.returnToCategories();
            return false;
        }

        const user = JSON.parse(sessionStorage.getItem('user')) as User;
        const application = JSON.parse(sessionStorage.getItem('application')) as Application;

        return this.ratingService.getIsRated(user.id, application.id).pipe(map(isRated => {
            if (isRated === false) {
                sessionStorage.removeItem('application');
                return true;
            }
            this.returnToCategories();
            return false;
        }));
    }


    returnToCategories() {
        this.gem.updateInfo('You already rated this user about this job');
        this.router.navigate(['categories']);
        return false;
    }
}
