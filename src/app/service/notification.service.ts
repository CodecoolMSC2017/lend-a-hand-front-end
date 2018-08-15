import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(private http: HttpClient) {
    }

    public getAllNotificationsByUser(id): Observable<any> {
        return this.http.get('/api/notifications/all/user/' + id);
    }

    public getAllUnreadNotificationsByUser(id): Observable<any> {
        return this.http.get('/api/notifications/unread/user/' + id);
    }

    public readNotification(id): Observable<any> {
        return this.http.put('/api/notifications/' + id, null);
    }
}
