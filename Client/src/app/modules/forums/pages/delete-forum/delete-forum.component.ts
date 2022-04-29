import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewForumComponent } from "../../../../app.routing";
import { ForumsService } from '../../services/forums.service';

@Component({
  selector: 'app-delete-forum',
  templateUrl: './delete-forum.component.html',
  styleUrls: ['./delete-forum.component.css']
})
export class DeleteForumComponent implements OnInit {
    public status: string = "INIT";
    public errorMessage: string = "";
    public forum: any;
    private router: Router;
    private activatedRoute: ActivatedRoute;
    private forumsService: ForumsService;

    constructor(router: Router, activatedRoute: ActivatedRoute, forumsService: ForumsService) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.forumsService = forumsService;
    }

    ngOnInit(): void {
        const forum_id: number = this.activatedRoute.snapshot.params["forum_id"];
        this.forumsService.getById(forum_id).subscribe({
            next: (val) => {
                this.forum = val;
                console.log("Forum", val);
            }, error: (err) => {
                this.router.navigateByUrl("/not-found");
            }
        });
    }

    handleCancelDelete() {
        const forum_id = this.forum.id;
        const url = genUrlForViewForumComponent(forum_id);
        this.router.navigateByUrl(url);
    }

    handleDelete() {
        const forum_id = this.forum.id;
        this.status = "LOADING";
        this.forumsService.deleteById(forum_id).subscribe({
            next: () => {
                debugger;
                this.status = "SUCCESS";
                const parent_id = this.forum.parentId;
                let url = "";
                if (parent_id === null) {
                    url = "/"; // root
                } else {
                    url = genUrlForViewForumComponent(parent_id);
                }
                this.router.navigateByUrl(url);
            }, error: (err) => {
                if (err.status === 409) {
                    this.errorMessage = "Sorry, we were unable to delete this forum. You must first move or delete all topics inside this forum.";
                } else if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to delete this forum. You can only delete forums you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to delete this forum. Please check with admins.";
                }
                this.status = "ERROR";
            }
        });
    }

}
