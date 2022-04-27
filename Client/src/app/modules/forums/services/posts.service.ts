import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    create(data: any): Observable<any> {
        const endpoint = environment.apiUrl + "/Posts/Create";
        return this.http.post<any>(endpoint, data);
    }

    getById(post_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Posts/getById/${post_id}`;
        return this.http.get<any>(endpoint);
    }

    updateById(post_id: number, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Posts/updateById/${post_id}`;
        return this.http.put<any>(endpoint, data);
    }

    deleteById(post_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Posts/deleteById/${post_id}`;
        return this.http.delete<any>(endpoint);
    }

}
