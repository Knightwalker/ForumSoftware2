import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicsService } from '../../services/topics.service';
import { genUrlForViewForumComponent, genUrlForViewTopicComponent } from "../../../../app.routing";

@Component({
    selector: 'app-delete-topic',
    templateUrl: './delete-topic.component.html',
    styleUrls: ['./delete-topic.component.css']
})
export class DeleteTopicComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public topic: any;
    private router: Router;
    private activatedRoute: ActivatedRoute;
    private topicsService: TopicsService;

    constructor(router: Router, activatedRoute: ActivatedRoute, topicsService: TopicsService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.topicsService = topicsService;
    }

    ngOnInit(): void {
        const topic_id: number = this.activatedRoute.snapshot.params["topic_id"];
        this.topicsService.getById(topic_id).subscribe((res) => {
            this.topic = res;
            console.log("Topic", res);
        });
    }

    handleCancelDelete() {
        const topic_id = this.topic.id;
        const url = genUrlForViewTopicComponent(topic_id);
        this.router.navigateByUrl(url);
    }

    handleDelete() {
        const topic_id = this.topic.id;
        this.status = "LOADING";
        this.topicsService.deleteById(topic_id).subscribe({
            next: () => {
                this.status = "SUCCESS";
                const forum_id = this.topic.forumId;
                const url = genUrlForViewForumComponent(forum_id);
                this.router.navigateByUrl(url);
            }, error: (err) => {
                if (err.status === 409) {
                    this.errorMessage = "Sorry, we were unable to delete this topic. You must first move or delete all posts inside this topic.";
                } else if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to delete this topic. You can only delete topics you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to delete this topic. Please check with admins.";
                }
                this.status = "ERROR";
            }
        });
    }

}
