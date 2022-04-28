import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateForumComponent } from './pages/create-forum/create-forum.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumsService } from './services/forums.service';
import { ForumsListComponent } from './components/forums-list/forums-list.component';
import { AppRoutingModule } from 'src/app/app.routing';
import { ViewForumComponent } from './pages/view-forum/view-forum.component';
import { ForumListComponent } from './components/forum-list/forum-list.component';
import { CreateTopicComponent } from './pages/create-topic/create-topic.component';
import { TopicsService } from './services/topics.service';
import { ViewTopicComponent } from './pages/view-topic/view-topic.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { PostsService } from './services/posts.service';
import { DeleteTopicComponent } from './pages/delete-topic/delete-topic.component';
import { DeletePostComponent } from './pages/delete-post/delete-post.component';
import { MatButtonModule } from "@angular/material/button";
import { EditPostComponent } from './pages/edit-post/edit-post.component';
import { EditTopicComponent } from './pages/edit-topic/edit-topic.component';

@NgModule({
    declarations: [
        CreateForumComponent,
        ForumsListComponent,
        ForumListComponent,
        TopicListComponent,
        ViewForumComponent,
        CreateTopicComponent,
        ViewTopicComponent,
        CreatePostComponent,
        DeleteTopicComponent,
        DeletePostComponent,
        EditPostComponent,
        EditTopicComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatButtonModule
    ],
    exports: [
        ForumsListComponent,
        ForumListComponent
    ],
    providers: [
        ForumsService,
        TopicsService,
        PostsService
    ]
})
export class ForumsModule { }
