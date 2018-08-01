import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient) {
    }

    sendApplication(application): Observable<any> {
        return this.http.post('/api/applications/new', application);
    }

    getApplicationsByAapplicantId(applicantId): Observable<any> {
        return this.http.get('api/applications/applicants/' + applicantId);
    }
}
