import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode, { JwtPayload } from "jwt-decode";

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

    isAuthenticated() {
        const token = this.getToken();
        if (token) {
            return true;
        }
        return false;
    }

    getDecodedToken() {
        const token: string = localStorage.getItem("token") ?? "";
        const decoded = jwtDecode<JwtPayload>(token); // Returns with the JwtPayload type
        return decoded
    }

}
