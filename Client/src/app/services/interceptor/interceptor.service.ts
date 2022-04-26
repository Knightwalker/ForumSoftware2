import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/users/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();        
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(req);
    }

}
