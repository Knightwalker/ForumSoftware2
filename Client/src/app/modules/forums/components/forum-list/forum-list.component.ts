import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-forum-list',
    templateUrl: './forum-list.component.html',
    styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {
    @Input() forum: any;

    constructor() { }

    ngOnInit(): void {
        console.log(this.forum);
    }

}
