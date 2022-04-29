import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from "@angular/material/table";
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app.routing';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ProfileComponent,
        UsersComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatTableModule
    ],
    exports: [
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ProfileComponent
    ]
})
export class UsersModule { }
