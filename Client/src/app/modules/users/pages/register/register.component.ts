import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    private fb: FormBuilder;
    private authService: AuthService;
    private router: Router;

    constructor(fb: FormBuilder, authService: AuthService, router: Router) {
        this.fb = fb;
        this.authService = authService;
        this.registerForm = this.fb.group({
            "username": ["", [Validators.required]],
            "email": ["", [Validators.required]],
            "password": ["", [Validators.required]]
        }),
        this.router = router;
    }

    ngOnInit(): void {
    }

    handleRegister() {
        const data = this.registerForm.value;
        this.authService.register(data).subscribe(() => {
            this.router.navigateByUrl("/login");
        });
    }

    isRegisterFormInvalid() {
        const username = this.registerForm.get("username");
        const email = this.registerForm.get("email");
        const password = this.registerForm.get("password");
        if (username?.touched && username?.errors?.["required"]) {
            return true;
        }
        if (email?.touched && email?.errors?.["required"]) {
            return true;
        }
        if (password?.touched && password?.errors?.["required"]) {
            return true;
        }
        return false;
    }

    genRegisterFormErrorsArr() {
        const errors: string[] = [];
        const username = this.registerForm.get("username");
        const email = this.registerForm.get("email");
        const password = this.registerForm.get("password");
        if (username?.touched && username?.errors?.["required"]) {
            errors.push("Username is required");
        }
        if (email?.touched && email?.errors?.["required"]) {
            errors.push("Email is required");
        }
        if (password?.touched && password?.errors?.["required"]) {
            errors.push("Password is required");
        }
        return errors;
    }

}
