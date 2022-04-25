import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forum } from '../interfaces/forum';

@Injectable({
    providedIn: 'root'
})
export class ForumsService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    create(data: Forum): Observable<any> {
        const endpoint = environment.apiUrl + "/forums/create";
        return this.http.post<any>(endpoint, data);
    }

}
