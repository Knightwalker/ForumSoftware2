import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forum } from '../interfaces/forum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ForumsService {
    private http: HttpClient;
    private authService: AuthService;

    constructor(http: HttpClient, authService: AuthService) {
        this.http = http;
        this.authService = authService;
    }

    create(data: Forum): Observable<any> {
        debugger;
        const token = this.authService.getToken();
        let headers = new HttpHeaders({
            "Authorization": `Bearer ${token}`
        });

        const endpoint = environment.apiUrl + "/forums/create";
        return this.http.post<any>(endpoint, data, {
            headers: headers
        });
    }

}
