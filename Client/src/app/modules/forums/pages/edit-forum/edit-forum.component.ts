import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genUrlForViewForumComponent } from "../../../../app.routing";
import { ForumsService } from '../../services/forums.service';
@Component({
  selector: 'app-edit-forum',
  templateUrl: './edit-forum.component.html',
  styleUrls: ['./edit-forum.component.css']
})
export class EditForumComponent implements OnInit {
    public status: string = "INIT";
    public forumTypes: string[] = ["forum", "category"];
    public errorMessage: string = "";
    public forum: any;
    public forumForm: FormGroup;
    private router: Router;
    private fb: FormBuilder;
    private forumsService: ForumsService;
    private activatedRoute: ActivatedRoute;

    constructor(
        router: Router,
        fb: FormBuilder,
        forumsService: ForumsService,
        activatedRoute: ActivatedRoute) {
        this.router = router;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.forumForm = this.fb.group({
            "parentId": [null],
            "type": ["", Validators.required],
            "name": ["", [Validators.required]],
            "description": ["", [Validators.required]],
            "imageUrl": ["", [Validators.required]]
        })
        this.forumsService = forumsService;
    }

    ngOnInit(): void {
        const forum_id: number = Number(this.activatedRoute.snapshot.params["forum_id"]);
        this.forumsService.getById(forum_id).subscribe((res) => {
            this.forum = res;
            console.log("Forum", this.forum);
            this.forumForm.setControl("parentId", this.fb.control(this.forum.parentId));
            this.forumForm.setControl("type", this.fb.control(this.forum.type));
            this.forumForm.setControl("name", this.fb.control(this.forum.name));
            this.forumForm.setControl("description", this.fb.control(this.forum.description));
            this.forumForm.setControl("imageUrl", this.fb.control(this.forum.imageUrl));
        });
    }

    handleEdit(): void {
        const forum_id: number = Number(this.activatedRoute.snapshot.params["forum_id"]);
        const data: any = this.forumForm.value;
        this.status = "LOADING";
        this.forumsService.updateById(forum_id, data).subscribe({
            next: () => {
                const parent_id: string = this.forum.parentId;
                const endpoint = genUrlForViewForumComponent(parent_id);
                const endpointToRoot = "/";
                this.router.navigateByUrl(endpointToRoot);
                this.status = "SUCCESS";
            },
            error: (err) => {
                if (err.status === 403) {
                    this.errorMessage = "Sorry, we were unable to update this forum. You can only edit forums you authored.";
                } else if (err.status === 400) {
                    this.errorMessage = "Sorry, we were unable to update this forum. Please check with admins.";
                } else {
                    this.errorMessage = "Sorry, we were unable to establish internet connection.";
                }
                this.status = "ERROR";
            }
        })
    }

}
