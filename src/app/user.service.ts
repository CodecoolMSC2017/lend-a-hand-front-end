import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    updateUser(user: User): Observable<any> {
        return this.http.put('/api/user/' + user.id, user);
    }

    getUserById(id: number): Observable<any> {
        return this.http.get('/api/user/' + id);
    }


}
