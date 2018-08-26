import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user.model";
import {UserBalance} from "../model/user-balance.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getAllUser(): Observable<any> {
        return this.http.get('/api/user');
    }

    updateUser(user: User): Observable<any> {
        return this.http.put('/api/user', user);
    }

    getUserById(id: number): Observable<any> {
        return this.http.get('/api/user/' + id);
    }

    getIsContacted(profileOwnerId: number, userId: number): Observable<boolean> {
        const params = new HttpParams().append('userId', userId.toString()).append('profileOwnerId', profileOwnerId.toString());
        return this.http.get<boolean>('/api/user/contacted', {params: params});
    }

    updateUserBalance(userBalance: UserBalance): Observable<any> {
        return this.http.put('/api/user/balance', userBalance);
    }

    updateUserBlocked(id: number): Observable<any> {
        return this.http.put('/api/user/block/' + id, null);
    }

    updateUserUnblocked(id: number): Observable<any> {
        return this.http.put('/api/user/unblock/' + id, null);
    }

}
