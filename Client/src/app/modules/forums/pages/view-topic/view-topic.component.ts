import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from '../../services/topics.service';

@Component({
    selector: 'app-view-topic',
    templateUrl: './view-topic.component.html',
    styleUrls: ['./view-topic.component.css']
})
export class ViewTopicComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public topic: any;
    private topicsService: TopicsService;
    private activatedRoute: ActivatedRoute;

    constructor(topicsService: TopicsService, activatedRoute: ActivatedRoute) { 
        this.topicsService = topicsService;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        const topic_id: number = this.activatedRoute.snapshot.params["topic_id"];
        this.topicsService.getById(topic_id).subscribe({
            next: (val) => {
                let posts = this.transformPosts(val.posts);
                let topic = val;
                topic.posts = posts;
                this.topic = topic;
                this.status = "SUCCESS";
            },
            error: (err) => {
                this.errorMessage = err.message;
                this.status = "ERROR";
            }
        });
    }

    transformPosts(postsArr: any[]) {
        const len = postsArr.length;
        for (let i = 0; i < len; i++) {
            postsArr[i].createdOnDate = new Intl.DateTimeFormat("en-US", { 
                dateStyle: "medium", 
                timeStyle: "short",
                hour12: false
            }).format(new Date(postsArr[i].createdOnDate));
        };
        return postsArr;
    }

}
