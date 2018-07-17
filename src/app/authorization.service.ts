import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    constructor(private http: HttpClient) {
    }

    loginUser(user: User): Observable<any> {
        return this.http.post('/api/auth/login', user);
    }

    registerUser(user: User): Observable<any> {
        return this.http.post('/api/auth/register', {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + window.btoa(user.userName + ':' + user.password)
            })
        });
    }

    deleteAuth(): Observable<void> {
        return this.http.delete<void>('/api/auth/logout');
}
}
