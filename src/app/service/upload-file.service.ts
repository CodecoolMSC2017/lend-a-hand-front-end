import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private http: HttpClient) {
    }

    pushFileToStorage(file: File, userName: string): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        const extension = file.name.split('.').pop();
        const fileName = userName + new Date().valueOf().toString();

        formdata.append('file', file);

        const req = new HttpRequest('POST', '/api/file/upload/' + fileName + '/' + extension, formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    getFiles(): Observable<any> {
        return this.http.get('http://localhost:8080/api/file/all');
    }
}
