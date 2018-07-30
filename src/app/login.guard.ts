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
        if (sessionStorage.getItem('user')) {
            if ((JSON.parse(sessionStorage.getItem('user')) as User).verificated === true) {
                return true;
            }
            this.router.navigate(['verification']);
            return false;
        }
        this.router.navigate(['login']);
        return false;
    }
}
