import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public loginForm: FormGroup;
    private fb: FormBuilder;
    private authService: AuthService;

    constructor(fb: FormBuilder, authService: AuthService) {
        this.fb = fb;
        this.authService = authService;
        this.loginForm = this.fb.group({
            "username": ["", [Validators.required]],
            "password": ["", [Validators.required]]
        })
    }

    ngOnInit(): void {
    }

    handleLogin() {
        const data = this.loginForm.value;
        this.status = "LOADING";
        this.authService.login(data).subscribe({
            next: (val) => {
                this.status = "SUCCESS";
                const token = val;
                this.authService.saveToken(token);
                window.location.href = "/"; // Workaround
            }, error: (err) => {
                if (err.status === 401) {
                    this.errorMessage = "Sorry, we were unable to authenticate this user. Please provide a matching username and password combination";
                } else {
                    this.errorMessage = "Sorry, we were unable to establish internet connection.";
                }
                this.status = "ERROR";
            }
        });
    }

    isLoginFormInvalid(): boolean {
        const username = this.loginForm.get("username");
        const password = this.loginForm.get("password");
        if (username?.touched && username?.errors?.["required"]) {
            return true;
        }
        if (password?.touched && password?.errors?.["required"]) {
            return true;
        }
        return false;
    }

    genLoginFormErrorsArr(): string[] {
        const errors: string[] = [];
        const username = this.loginForm.get("username");
        const password = this.loginForm.get("password");
        if (username?.touched && username?.errors?.["required"]) {
            errors.push("Username is required");
        }
        if (password?.touched && password?.errors?.["required"]) {
            errors.push("Password is required");
        }
        return errors;
    }

}
