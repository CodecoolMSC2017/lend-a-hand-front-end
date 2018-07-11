import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient, private router: Router) {
    }

    loginUser(user: User): Observable<any> {
        return this.http.post('http://localhost:8080/user/login', user);
    }
}
