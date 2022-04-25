import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-forums-list',
    templateUrl: './forums-list.component.html',
    styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
    @Input() forumsArr!: Array<any>;

    constructor() { }

    ngOnInit(): void {
    }

}
