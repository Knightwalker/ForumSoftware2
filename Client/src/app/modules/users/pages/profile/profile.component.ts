import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public user!: any;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    ngOnInit(): void {
        const decodedToken = this.authService.getDecodedToken();
        const user_id = decodedToken.nameid;
        this.authService.getById(user_id).subscribe((res) => {
            this.user = res;
            console.log("User", res);
        });
    }

    handleChangeUserName(e: HTMLInputElement): void {
        const decodedToken = this.authService.getDecodedToken();
        const user_id = decodedToken.nameid;
        const username = e.value;
        this.authService.updateUserNameById(user_id, { username: username }).subscribe({
            next: (val) => {
                this.user = val;
            }, error: (err) => {
                console.log(err);
            }
        })
    }

    handleChangeEmail(e: HTMLInputElement): void {
        const decodedToken = this.authService.getDecodedToken();
        const user_id = decodedToken.nameid;
        const email = e.value;
        this.authService.updateEmailById(user_id, { email: email }).subscribe({
            next: (val) => {
                this.user = val;
            }, error: (err) => {
                console.log(err);
            }
        })
    }

    handleChangeAvatar(e: HTMLInputElement): void {
        const decodedToken = this.authService.getDecodedToken();
        const user_id = decodedToken.nameid;
        const avatar = e.value;
        this.authService.updateAvatarById(user_id, { imageUrl: avatar }).subscribe({
                next: (val) => {
                    this.user = val;
                }, error: (err) => {
                    console.log(err);
                }
            })
    };

}
