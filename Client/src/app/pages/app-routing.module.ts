import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../core/pages/not-found/not-found.component';
import { CreateForumComponent } from '../modules/forums/pages/create-forum/create-forum.component';
import { LoginComponent } from '../modules/users/pages/login/login.component';
import { LogoutComponent } from '../modules/users/pages/logout/logout.component';
import { ProfileComponent } from '../modules/users/pages/profile/profile.component';
import { RegisterComponent } from '../modules/users/pages/register/register.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "logout",
        component: LogoutComponent
    },
    {
        path: "profile",
        component: ProfileComponent
    },
    {
        path: "forums/create",
        component: CreateForumComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }