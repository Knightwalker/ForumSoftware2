import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewTopicComponent } from "../../../../app.routing";
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public post: any;
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
        this.postForm = this.fb.group({
            "name": ["", [Validators.required]],
            "content": ["", [Validators.required]]
        })
        this.postsService = postsService;
    }

    ngOnInit(): void {
        const post_id: number = Number(this.activatedRoute.snapshot.params["post_id"]);
        this.postsService.getById(post_id).subscribe((res) => {
            this.post = res;
            this.postForm.setControl("name", this.fb.control(this.post.name));
            this.postForm.setControl("content", this.fb.control(this.post.content));
        });
    }

    handleEdit(): void {
        const post_id: number = Number(this.activatedRoute.snapshot.params["post_id"]);
        const data: any = this.postForm.value;
        this.status = "LOADING";
        this.postsService.updateById(post_id, data).subscribe({
            next: () => {
                const topic_id: string = this.post.topicId;
                const endpoint = genUrlForViewTopicComponent(topic_id);
                this.router.navigateByUrl(endpoint);
                this.status = "SUCCESS";
            },
            error: (err) => {
                if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to update this post. You can only edit posts you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to delete this topic. Please check with admins.";
                }
                this.status = "ERROR";
            }
        })
    }

}
