import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {Report} from "../model/report.model";

@Injectable({
    providedIn: 'root'
})
export class ReportService {

    constructor(private http: HttpClient) {
    }

    public getReports(): Observable<Report[]> {
        return this.http.get<Report[]>('/api/reports');
    }

    public getReportsByReportedUser(id: number): Observable<Report[]> {
        return this.http.get<Report[]>('/api/reports/users/' + id);

    }

    public getReportsByReportedAd(id: number): Observable<Report[]> {
        return this.http.get<Report[]>('/api/reports/ads/' + id);

    }

    public createReport(report: Report): Observable<any> {
        return this.http.post('/api/reports/new', report);
    }

    public handleReport(id: number): Observable<any> {
        return this.http.put('/api/reports/update/' + id, null);
    }
}
