import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../model/message.model';

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

}
