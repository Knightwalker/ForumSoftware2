import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/users/services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    public isLoggedIn: boolean;
    public username: string = "username";
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.isLoggedIn = false;
    }

    ngOnInit(): void {
        this.isLoggedIn = this.authService.isAuthenticated();
        const decodedToken = this.authService.getDecodedToken();
        console.log(decodedToken);
        this.username = decodedToken.name;
    }

}
