import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {RegisterDatasModel} from '../model/register-datas.model';
import {VerificationModel} from '../model/verification.model';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    constructor(private http: HttpClient) {
    }

    loginUser(user: User): Observable<any> {
        return this.http.get('/api/auth', {
            headers: new HttpHeaders({
                'Authorization': 'Basic ' + window.btoa(user.userName + ':' + user.password)
            })
        });
    }

    registerUser(registerDatas: RegisterDatasModel): Observable<any> {
        return this.http.post('/api/register', registerDatas);
    }

    verificateUser(verificationData: VerificationModel): Observable<any> {
        return this.http.post('/api/auth/verificate', verificationData);
    }

    deleteAuth(): Observable<void> {
        return this.http.delete<void>('/api/auth');
}
}
