import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewForumComponent, genUrlForViewTopicComponent } from "../../../../app.routing";
import { PostsService } from '../../services/posts.service';

@Component({
    selector: 'app-delete-post',
    templateUrl: './delete-post.component.html',
    styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public post: any;
    private router: Router;
    private activatedRoute: ActivatedRoute;
    private postsService: PostsService;

    constructor(router: Router, activatedRoute: ActivatedRoute, postsService: PostsService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.postsService = postsService;
    }

    ngOnInit(): void {
        const post_id: number = this.activatedRoute.snapshot.params["post_id"];
        this.postsService.getById(post_id).subscribe({
            next: (val) => {
                this.post = val;
                console.log("Post", val);
            }, error: (err) => {
                this.router.navigateByUrl("/not-found");
            }
        });
    }

    handleCancelDelete() {
        const topic_id = this.post.topicId;
        const url = genUrlForViewTopicComponent(topic_id);
        this.router.navigateByUrl(url);
    }

    handleDelete() {
        const post_id = this.post.id;
        this.status = "LOADING";
        this.postsService.deleteById(post_id).subscribe({
            next: () => {
                this.status = "SUCCESS";
                const topic_id = this.post.topicId;
                const url = genUrlForViewTopicComponent(topic_id);
                this.router.navigateByUrl(url);
            }, error: (err) => {
                if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to delete this post. You can only delete post you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to delete this post. Please check with admins.";
                }
                this.status = "ERROR";
            }
        });
    }

}
