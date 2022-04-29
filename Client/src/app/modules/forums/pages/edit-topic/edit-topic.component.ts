import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewForumComponent } from "../../../../app.routing";
import { TopicsService } from '../../services/topics.service';

@Component({
    selector: 'app-edit-topic',
    templateUrl: './edit-topic.component.html',
    styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public topic: any;
    public topicForm: FormGroup;
    private router: Router;
    private fb: FormBuilder;
    topicsService: TopicsService;
    private activatedRoute: ActivatedRoute;

    constructor(
        router: Router,
        fb: FormBuilder,
        topicsService: TopicsService,
        activatedRoute: ActivatedRoute) {
        this.router = router;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.topicForm = this.fb.group({
            "name": ["", [Validators.required]],
            "description": ["", [Validators.required]]
        })
        this.topicsService = topicsService;
    }

    ngOnInit(): void {
        const topic_id: number = Number(this.activatedRoute.snapshot.params["topic_id"]);
        this.topicsService.getById(topic_id).subscribe((res) => {
            this.topic = res;
            this.topicForm.setControl("name", this.fb.control(this.topic.name));
            this.topicForm.setControl("description", this.fb.control(this.topic.description));
        });
    }

    handleEdit(): void {
        const topic_id: number = Number(this.activatedRoute.snapshot.params["topic_id"]);
        const data: any = this.topicForm.value;
        this.status = "LOADING";
        this.topicsService.updateById(topic_id, data).subscribe({
            next: () => {
                const forum_id: string = this.topic.forumId;
                const endpoint = genUrlForViewForumComponent(forum_id);
                this.router.navigateByUrl(endpoint);
                this.status = "SUCCESS";
            },
            error: (err) => {
                if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to update this topic. You can only edit topics you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to update this topic. Please check with admins.";
                }
                this.status = "ERROR";
            }
        })
    }

}
