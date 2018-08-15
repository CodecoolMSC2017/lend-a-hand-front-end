import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowReportsService {

  constructor(private http:HttpClient) { }

  public getAllReports():Observable<any>{
    return this.http.get('/api/reports');
  }
}
