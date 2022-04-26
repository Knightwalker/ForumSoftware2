import { Component, OnInit } from '@angular/core';
import { ForumsService } from 'src/app/modules/forums/services/forums.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public forumsArr!: Array<any>;
    private forumsService: ForumsService;

    constructor(forumsService: ForumsService) {
        this.forumsService = forumsService;
     }

    ngOnInit(): void {
        this.forumsService.getAll().subscribe((res) => {
            this.forumsArr = res;
            console.log(res);
        });
    }

}
