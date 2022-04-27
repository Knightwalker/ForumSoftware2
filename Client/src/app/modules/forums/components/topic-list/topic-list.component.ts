import { Component, Input, OnInit } from '@angular/core';
import { genUrlForTopicsDelete, genUrlForPostsCreate } from "../../../../app.routing";

@Component({
    selector: 'app-topic-list',
    templateUrl: './topic-list.component.html',
    styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
    @Input() topic: any;
    public urlForTopicsDelete!: string;
    public urlForPostsCreate!: string;

    constructor() {
    }
    
    ngOnInit(): void {
        console.log("Topic", this.topic);
        this.urlForTopicsDelete = genUrlForTopicsDelete(this.topic.id);
        this.urlForPostsCreate = genUrlForPostsCreate(this.topic.id);
    }

}
