import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    public isAuthenticated: boolean = false;
    public username: string = "username";
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    ngOnInit(): void {
        this.isAuthenticated = this.authService.isAuthenticated();
    }

}
