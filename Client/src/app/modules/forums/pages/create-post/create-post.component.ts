import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewTopicComponent } from "../../../../app.routing";
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
    public postForm: FormGroup;
    private router: Router;
    private fb: FormBuilder;
    private postsService: PostsService;
    private activatedRoute: ActivatedRoute;

    constructor(
        router: Router,
        fb: FormBuilder,
        postsService: PostsService,
        activatedRoute: ActivatedRoute) {
        this.router = router;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        const topic_id: string = this.activatedRoute.snapshot.params["topic_id"];
        this.postForm = this.fb.group({
            "topicId": [topic_id, [Validators.required]],
            "name": ["", [Validators.required]],
            "content": ["", [Validators.required]]
        })
        this.postsService = postsService;
    }

    ngOnInit(): void {

    }

    handleCreate(): void {
        const data: any = this.postForm.value;
        this.postsService.create(data).subscribe({
            next: (val) => {
                const topic_id: string = this.activatedRoute.snapshot.params["topic_id"];
                const endpoint = genUrlForViewTopicComponent(topic_id);
                this.router.navigateByUrl(endpoint);
            },
            error: (err) => {
                console.error("BACKEND ERROR", err);
            }
        })
    }
}
