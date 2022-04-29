import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from '../../services/forums.service';
import { Subscription, tap } from 'rxjs';

@Component({
    selector: 'app-view-forum',
    templateUrl: './view-forum.component.html',
    styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit, OnDestroy {
    public status: string = "INIT";
    public errorMessage: string = "";
    public forum: any;
    private forumsService: ForumsService;
    private activatedRoute: ActivatedRoute;
    private subscription!: Subscription;

    constructor(forumsService: ForumsService, activatedRoute: ActivatedRoute) {
        this.forumsService = forumsService;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        const forum_id: number = this.activatedRoute.snapshot.params["forum_id"];
        this.subscription = this.forumsService.getById(forum_id)
            .pipe(
                tap(() => {
                    this.status = "LOADING";
                })
            )
        .subscribe({
            next: (val) => {
                this.forum = val;
                console.log("Forum", val);
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

}
