import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forum } from '../../interfaces/forum';
import { ForumsService } from '../../services/forums.service';

@Component({
    selector: 'app-create-forum',
    templateUrl: './create-forum.component.html',
    styleUrls: ['./create-forum.component.css']
})
export class CreateForumComponent implements OnInit, OnDestroy {
    public backendErrors: string[] = [];
    public forumTypes: string[] = ["category", "forum"];
    public forumForm: FormGroup;
    private fb: FormBuilder;
    private forumService: ForumsService;
    private subscription: any;

    constructor(fb: FormBuilder, forumService: ForumsService) { 
        this.fb = fb;
        this.forumForm = this.fb.group({
            "type": [this.forumTypes[0]],
            "name": ["", [Validators.required]],
            "description": ["", [Validators.required]]
        })
        this.forumService = forumService;
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        debugger;
        this.subscription.unsubscribe();
    }

    handleCreate(): void {
        const data: Forum = this.forumForm.value;

        this.subscription = this.forumService.create(data).subscribe({
            next: (v) => { 
                debugger;
                console.log(v); 
            },
            error: (e) => { 
                console.error("BACKEND ERROR", e); 
            }
        })
    }

}
