import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
        this.authService.login(data).subscribe((res) => {
            const token = res;
            this.authService.saveToken(token);
            window.location.href = "/"; // Workaround
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
