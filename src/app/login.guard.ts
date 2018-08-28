import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './model/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!sessionStorage.getItem('user')) {
            this.router.navigate(['login']);
            return false;
        }
        const user = JSON.parse(sessionStorage.getItem('user')) as User;
        if (user.verificated === false) {
            this.router.navigate(['verification']);
            return false;
        }
        if (user.hasPaid === false && user.type === 'company') {
            this.router.navigate(['payment']);
            return false;
        }
        return true;
    }
}
