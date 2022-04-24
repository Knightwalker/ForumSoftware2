import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http: HttpClient;

    constructor(http: HttpClient) { 
        this.http = http;
    }

    login(data: any): Observable<any> {
        const endpoint = environment.apiUrl + "/identity/login";
        return this.http.post(endpoint, data, { responseType: "text" });
    }

    register(data: any): Observable<any> {
        const endpoint = environment.apiUrl + "/identity/register";
        return this.http.post(endpoint, data);
    }

    saveToken(token: string) {
        localStorage.setItem("token", token);
    }

    getToken() {
        return localStorage.getItem("token");
    }

}
