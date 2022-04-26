import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateForumComponent } from './pages/create-forum/create-forum.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumsService } from './services/forums.service';
import { ForumsListComponent } from './components/forums-list/forums-list.component';
import { AppRoutingModule } from 'src/app/app.routing';

@NgModule({
    declarations: [
        CreateForumComponent,
        ForumsListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    exports: [
        ForumsListComponent
    ],
    providers: [
        ForumsService
    ]
})
export class ForumsModule { }
