import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient) {
    }

    registerUser(user: User): Observable<any> {
        return this.http.post('/api/auth/register', {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + window.btoa(user.userName + ':' + user.password)
            })
        });
    }
}
