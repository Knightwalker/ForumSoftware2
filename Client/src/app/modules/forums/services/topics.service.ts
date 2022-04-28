import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    create(data: any): Observable<any> {
        const endpoint = environment.apiUrl + "/Topics/Create";
        return this.http.post<any>(endpoint, data);
    }

    getById(topic_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Topics/getById/${topic_id}`;
        return this.http.get<any>(endpoint);
    }

    updateById(topic_id: number, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Topics/updateById/${topic_id}`;
        return this.http.put<any>(endpoint, data);
    }

    deleteById(topic_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Topics/deleteById/${topic_id}`;
        return this.http.delete<any>(endpoint);
    }

}
