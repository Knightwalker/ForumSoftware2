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
        const endpoint = environment.apiUrl + "/Forums/Create";
        return this.http.post<any>(endpoint, data);
    }

    getAll(): Observable<any> {
        const endpoint = environment.apiUrl + "/Forums/GetAll";
        return this.http.get<any>(endpoint);
    }

    getById(id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Forums/getById/${id}`;
        return this.http.get<any>(endpoint);
    }

    updateById(forum_id: number, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Forums/updateById/${forum_id}`;
        return this.http.put<any>(endpoint, data);
    }

    deleteById(forum_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Forums/deleteById/${forum_id}`;
        return this.http.delete<any>(endpoint);
    }

}
