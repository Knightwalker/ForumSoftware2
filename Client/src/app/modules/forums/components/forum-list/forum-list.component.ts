import { Component, Input, OnInit } from '@angular/core';
import { genUrlForForumsDelete, getUrlForForumsEdit, getUrlForTopicsCreate } from "../../../../app.routing";

@Component({
    selector: 'app-forum-list',
    templateUrl: './forum-list.component.html',
    styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
    @Input() forum: any;
    public urlForTopicsCreate!: string;
    public urlForForumsDelete!: string;
    public urlForForumsEdit!: string;

    constructor() { }

    ngOnInit(): void {
        this.urlForForumsDelete = genUrlForForumsDelete(this.forum.id);
        this.urlForForumsEdit = getUrlForForumsEdit(this.forum.id);
        this.urlForTopicsCreate = getUrlForTopicsCreate(this.forum.id);
    }

}
