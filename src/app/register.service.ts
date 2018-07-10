import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registerUser(email: String, password: String, userName: String, type: String): Observable<any> {
    return this.http.post('http://localhost:8080/user/register', email, password, userName, type);
  }
}
