import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message.model';
import {UserContact} from '../model/user-contact.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    constructor(private http: HttpClient) {
    }

    public getContactsByUserId(id): Observable<any> {
        return this.http.get('/api/messages/contacts/' + id);
    }

    public createMessage(message: Message): Observable<any> {
        return this.http.post('/api/messages/new', message);
    }

    public readMessages(userContactModel: UserContact): Observable<any> {
        return this.http.put('/api/messages/read', userContactModel);
    }

    public haveNewMessages(id): Observable<any> {
        return this.http.get('/api/messages/new/' + id);
    }

    public getNewMessages(userId: number, contactedId: number, messageId: number): Observable<any> {
        const params = new HttpParams().append('userId', userId.toString()).append('contactedId', contactedId.toString()).append('messageId', messageId.toString());
        return this.http.get('/api/messages/', {params: params});
    }
}
