import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from './model/user.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (sessionStorage.getItem('user')) {
            if (!(JSON.parse(sessionStorage.getItem('user')) as User).hasPaid && (JSON.parse(sessionStorage.getItem('user')) as User).type === "company") {
              this.router.navigate(['payment']);
              return false;
            }
            this.router.navigate(["categories"]);
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
        
}
