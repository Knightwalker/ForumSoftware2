import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from '../../services/topics.service';
import { genUrlForViewForumComponent } from "../../../../app.routing";

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {
    public topicForm: FormGroup;
    private router: Router;
    private fb: FormBuilder;
    private topicsService: TopicsService;
    private activatedRoute: ActivatedRoute;

    constructor(
        router: Router, 
        fb: FormBuilder, 
        topicsService: TopicsService, 
        activatedRoute: ActivatedRoute) 
    { 
        this.router = router;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        const forum_id: string = this.activatedRoute.snapshot.params["forum_id"];
        this.topicForm = this.fb.group({
            "forumId": [forum_id, [Validators.required]],            
            "name": ["", [Validators.required]],
            "description": ["", [Validators.required]]
        })
        this.topicsService = topicsService;
    }

    ngOnInit(): void {

    }

    handleCreate(): void {
        const data: any = this.topicForm.value;
        this.topicsService.create(data).subscribe({
            next: (val) => {
                const forum_id: string = this.activatedRoute.snapshot.params["forum_id"];
                const endpoint = genUrlForViewForumComponent(forum_id);
                this.router.navigateByUrl(endpoint);
            },
            error: (err) => { 
                console.error("BACKEND ERROR", err); 
            }
        })
    }
}
