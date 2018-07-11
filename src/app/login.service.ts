import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) {
    }

    loginUser(user: User): Observable<any> {
        return this.http.post('http://localhost:8080/user/login', user);
    }
}
