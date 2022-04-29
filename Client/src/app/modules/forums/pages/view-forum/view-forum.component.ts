import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from '../../services/forums.service';

@Component({
    selector: 'app-view-forum',
    templateUrl: './view-forum.component.html',
    styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public forum: any;
    private forumsService: ForumsService;
    private activatedRoute: ActivatedRoute;

    constructor(forumsService: ForumsService, activatedRoute: ActivatedRoute) {
        this.forumsService = forumsService;
        this.activatedRoute = activatedRoute;
    }

    ngOnInit(): void {
        const forum_id: number = this.activatedRoute.snapshot.params["forum_id"];
        this.forumsService.getById(forum_id).subscribe({
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

}
