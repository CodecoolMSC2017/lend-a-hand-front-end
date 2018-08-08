import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Application} from './model/application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationService {

    constructor(private http: HttpClient) {
    }

    sendApplication(application): Observable<any> {
        return this.http.post('/api/applications/new', application);
    }

    getApplicationsByApplicantId(applicantId): Observable<any> {
        return this.http.get('api/applications/applicants/' + applicantId);
    }

    getApplicationsByAd(adId): Observable<any> {
        return this.http.get('/api/applications/ads/' + adId);
    }

    acceptApplication(application: Application): Observable<any> {
        return this.http.put('/api/applications/accept/' + application.id, null);
    }

    declineApplication(application: Application): Observable<any> {
        return this.http.put('/api/applications/decline/' + application.id, null);
    }

    failedApplication(applicationId: number): Observable<any> {
        return this.http.put('/api/applications/fail/' + applicationId, null);
    }

    completeApplication(applicationId: number): Observable<any> {
        return this.http.put('/api/applications/complete/' + applicationId, null);
    }


}
