import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from './model/user.model';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (sessionStorage.getItem('user')) {
          if ((JSON.parse(sessionStorage.getItem('user')) as User).type === 'ADMIN') {
              return true;
          }
          this.router.navigate(['categories']);
          return false;
        }
     
  }
}
