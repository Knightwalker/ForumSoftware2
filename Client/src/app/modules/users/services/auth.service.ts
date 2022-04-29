import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwtDecode, { JwtPayload } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public isLoggedIn: boolean;
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.isLoggedIn = false;
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

    logout(): void {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
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
        const decoded = jwtDecode<any>(token); // Returns with the JwtPayload type
        return decoded
    }

    getById(user_id: number): Observable<any> {
        const endpoint = environment.apiUrl + `/Identity/getById/${user_id}`;
        return this.http.get<any>(endpoint);
    }

    getAllUsers(): Observable<any> {
        const endpoint = environment.apiUrl + `/Identity/getAllUsers`;
        return this.http.get<any>(endpoint);
    }

    updateEmailById(user_id: string, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Identity/updateEmailById/${user_id}`;
        return this.http.put<any>(endpoint, data);
    }

    updateAvatarById(user_id: string, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Identity/updateAvatarById/${user_id}`;
        return this.http.put<any>(endpoint, data);
    }

    updateUserNameById(user_id: string, data: any): Observable<any> {
        const endpoint = environment.apiUrl + `/Identity/updateUserNameById/${user_id}`;
        return this.http.put<any>(endpoint, data);
    }

}
