import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    private authService: AuthService;
    private router: Router;

    constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.router = router;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }

}
