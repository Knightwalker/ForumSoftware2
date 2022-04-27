import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { CreateForumComponent } from './modules/forums/pages/create-forum/create-forum.component';
import { CreatePostComponent } from './modules/forums/pages/create-post/create-post.component';
import { CreateTopicComponent } from './modules/forums/pages/create-topic/create-topic.component';
import { DeletePostComponent } from './modules/forums/pages/delete-post/delete-post.component';
import { DeleteTopicComponent } from './modules/forums/pages/delete-topic/delete-topic.component';
import { EditPostComponent } from './modules/forums/pages/edit-post/edit-post.component';
import { ViewForumComponent } from './modules/forums/pages/view-forum/view-forum.component';
import { ViewTopicComponent } from './modules/forums/pages/view-topic/view-topic.component';
import { LoginComponent } from './modules/users/pages/login/login.component';
import { LogoutComponent } from './modules/users/pages/logout/logout.component';
import { ProfileComponent } from './modules/users/pages/profile/profile.component';
import { RegisterComponent } from './modules/users/pages/register/register.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

export const genUrlForViewForumComponent = (forum_id: string) => { return `/forums/read/${forum_id}`}
export const genUrlForViewTopicComponent = (topic_id: string) => { return `/topics/read/${topic_id}`}
export const genUrlForTopicsDelete = (topic_id: string) => { return `/topics/delete/${topic_id}`}
export const genUrlForPostsCreate = (topic_id: string) => { return `/topics/create/new_post/${topic_id}`}

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
        path: "forums/read/:forum_id",
        component: ViewForumComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "forums/create/new_topic/:forum_id",
        component: CreateTopicComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "topics/read/:topic_id",
        component: ViewTopicComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "topics/create/new_post/:topic_id",
        component: CreatePostComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "topics/delete/:topic_id",
        component: DeleteTopicComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "posts/edit/:post_id",
        component: EditPostComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "posts/delete/:post_id",
        component: DeletePostComponent,
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