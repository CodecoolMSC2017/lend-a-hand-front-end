import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowReportsService {

  constructor(private http:HttpClient) { }

  public getUserReports():Observable<any>{
    return this.http.get('/api/reports/user');
  }

  public getAdReports():Observable<any>{
    return this.http.get('/api/reports/ad');
  }
}
