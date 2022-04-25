import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateForumComponent } from './pages/create-forum/create-forum.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForumsService } from './services/forums.service';

@NgModule({
  declarations: [
    CreateForumComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
      ForumsService
  ]
})
export class ForumsModule { }
