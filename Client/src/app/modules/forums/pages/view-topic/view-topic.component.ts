import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { TopicsService } from '../../services/topics.service';

@Component({
    selector: 'app-view-topic',
    templateUrl: './view-topic.component.html',
    styleUrls: ['./view-topic.component.css']
})
export class ViewTopicComponent implements OnInit, OnDestroy {
    public status: string = "INIT";
    public errorMessage: string = "";
    public topic: any;
    private topicsService: TopicsService;
    private activatedRoute: ActivatedRoute;
    private subscription!: Subscription;

    constructor(topicsService: TopicsService, activatedRoute: ActivatedRoute) { 
        this.topicsService = topicsService;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        const topic_id: number = this.activatedRoute.snapshot.params["topic_id"];
        this.subscription = this.topicsService.getById(topic_id)
        .pipe(
            tap(() => {
                this.status = "LOADING";
            })
        )
        .subscribe({
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

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
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
