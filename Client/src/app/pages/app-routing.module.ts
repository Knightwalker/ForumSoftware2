import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateForumComponent } from '../modules/forums/pages/create-forum/create-forum.component';
import { AuthGuardService } from '../services/auth-guard/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
        path: "forums/create",
        component: CreateForumComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "**",
        component: HomeComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }