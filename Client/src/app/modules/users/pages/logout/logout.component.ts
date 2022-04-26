import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    private authService: AuthService;
    private router: Router;

    constructor(authService: AuthService, router: Router) {
        this.authService = authService;
        this.router = router;
    }

    ngOnInit(): void {
    }

    handleLogout() {
        this.authService.logout();
        this.router.navigateByUrl("/", {replaceUrl: true});
        window.location.href = '/'; // Workaround for refresh
    }
    
    handleCancelLogout() {
        this.router.navigateByUrl("/");
    }

}
