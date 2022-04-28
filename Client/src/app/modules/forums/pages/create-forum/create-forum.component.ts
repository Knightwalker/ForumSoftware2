import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Forum } from '../../interfaces/forum';
import { ForumsService } from '../../services/forums.service';

@Component({
    selector: 'app-create-forum',
    templateUrl: './create-forum.component.html',
    styleUrls: ['./create-forum.component.css']
})
export class CreateForumComponent implements OnInit {
    public backendErrors: string[] = [];
    public forumTypes: string[] = ["forum", "category"];
    public forumForm: FormGroup;
    private fb: FormBuilder;
    private forumService: ForumsService;
    private router: Router;

    constructor(router: Router, fb: FormBuilder, forumService: ForumsService) { 
        this.fb = fb;
        this.router = router;
        this.forumForm = this.fb.group({
            "parentId": [null],
            "type": [this.forumTypes[0]],
            "name": ["", [Validators.required]],
            "description": ["", [Validators.required]],
            "imageUrl": ["", [Validators.required]]
        })
        this.forumService = forumService;
    }

    ngOnInit(): void {

    }

    handleCreate(): void {
        const data: Forum = this.forumForm.value;
        this.forumService.create(data).subscribe({
            next: (val) => {
                this.router.navigateByUrl("/");
            },
            error: (err) => { 
                console.error("BACKEND ERROR", err); 
            }
        })
    }

}
